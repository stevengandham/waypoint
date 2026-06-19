export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    
    // 1. Extract credentials stored securely in Cloudflare environment variables
    const clientEmail = context.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = context.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const spreadsheetId = context.env.GOOGLE_SPREADSHEET_ID;

    // 2. Generate Google OAuth Access Token via JWT
    const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

    // 3. Formulate the range row append payload
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:F:append?valueInputOption=USER_ENTERED`;
    
    const rowValues = [
      [data.firstName, data.lastName, data.email, data.phone, data.lifeGroup, data.availability]
    ];

    const googleResponse = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: rowValues })
    });

    if (!googleResponse.ok) {
      const errLog = await googleResponse.text();
      return new Response(`Google Sheets API Error: ${errLog}`, { status: 500 });
    }

    return new Response("Success", { status: 200 });

  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

// Native Cloudflare WebCrypto helper to authenticate with Google without external npm libraries
async function getGoogleAccessToken(email, armorKey) {
  const pkcs8Pem = armorKey.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\s/g, '');
  const rawKey = Uint8Array.from(atob(pkcs8Pem), c => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8", rawKey,
    { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } },
    false, ["sign"]
  );

  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" })).replace(/=+$/, '');
  const now = Math.floor(Date.now() / 1000);
  
  const claim = btoa(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  })).replace(/=+$/, '');

  const textEncoder = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, textEncoder.encode(`${header}.${claim}`));
  const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const jwt = `${header}.${claim}.${signature}`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });

  const tokenJson = await tokenResponse.json();
  return tokenJson.access_token;
}