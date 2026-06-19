import { getGoogleAccessToken } from './google-auth.js';

function getCredentials(env) {
  return {
    clientEmail: env.GOOGLE_CLIENT_EMAIL,
    privateKey: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    spreadsheetId: env.GOOGLE_SPREADSHEET_ID
  };
}

export async function appendLeadRow(env, rowValues) {
  const { clientEmail, privateKey, spreadsheetId } = getCredentials(env);
  const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:F:append?valueInputOption=USER_ENTERED`;
  const res = await fetch(appendUrl, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [rowValues] })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Sheets API Error: ${errText}`);
  }
}

export async function readLeadRows(env) {
  const { clientEmail, privateKey, spreadsheetId } = getCredentials(env);
  const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:F`;
  const res = await fetch(readUrl, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Sheets read error: ${errText}`);
  }

  const json = await res.json();
  return json.values || [];
}

export async function writeGroupResults(env, updates) {
  if (updates.length === 0) return;

  const { clientEmail, privateKey, spreadsheetId } = getCredentials(env);
  const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

  const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`;
  const body = {
    valueInputOption: 'USER_ENTERED',
    data: updates.map(u => ({
      range: `Sheet1!G${u.row}:H${u.row}`,
      values: [[u.groupLabel, u.slotLabel]]
    }))
  };

  const res = await fetch(batchUrl, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Sheets write error: ${errText}`);
  }
}
