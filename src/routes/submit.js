import { appendLeadRow } from '../lib/sheets.js';

export async function handleSubmit(request, env) {
  try {
    const data = await request.json();
    await appendLeadRow(env, [data.firstName, data.lastName, data.email, data.phone, data.lifeGroup, data.availability]);
    return new Response("Success", { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
