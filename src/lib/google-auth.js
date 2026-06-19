export async function getGoogleAccessToken(email, armorKey) {
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
