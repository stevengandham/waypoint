import { readLeadRows, writeGroupResults } from '../lib/sheets.js';
import { buildPeopleFromRows, groupLeads } from '../lib/grouping.js';

const MIN_GROUP_SIZE = 6;
const MAX_GROUP_SIZE = 12;

export async function handleGroup(request, env) {
  const authHeader = request.headers.get('Authorization') || '';
  if (authHeader !== `Bearer ${env.ADMIN_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  let rows;
  try {
    rows = await readLeadRows(env);
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }

  if (rows.length <= 1) {
    return Response.json({ message: 'No leads to group', groupCount: 0, groupSizes: [], unmatchedCount: 0 });
  }

  const people = buildPeopleFromRows(rows);
  const { groups, unmatchedIds } = groupLeads(people, { minSize: MIN_GROUP_SIZE, maxSize: MAX_GROUP_SIZE });

  const updates = [];
  groups.forEach((group, idx) => {
    const groupLabel = String(idx + 1);
    for (const row of group.memberIds) {
      updates.push({ row, groupLabel, slotLabel: group.slot });
    }
  });
  for (const row of unmatchedIds) {
    updates.push({ row, groupLabel: 'Unmatched', slotLabel: '' });
  }

  try {
    await writeGroupResults(env, updates);
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }

  return Response.json({
    groupCount: groups.length,
    groupSizes: groups.map(g => g.memberIds.length),
    unmatchedCount: unmatchedIds.length
  });
}
