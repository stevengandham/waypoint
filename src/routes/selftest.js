import { parseAvailability, ALL_SLOTS, groupLeads, buildPeopleFromRows } from '../lib/grouping.js';

function assertEqual(actual, expected, label, results) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  results.push({ label, pass, actual, expected });
}

export function handleSelfTest() {
  const results = [];

  assertEqual(ALL_SLOTS.length, 21, 'ALL_SLOTS has 21 entries', results);

  assertEqual(
    Array.from(parseAvailability('Mon-Morning, Wed-Evening')).sort(),
    ['Mon-Morning', 'Wed-Evening'],
    'parseAvailability parses two valid slots',
    results
  );

  assertEqual(
    Array.from(parseAvailability('')),
    [],
    'parseAvailability handles empty string',
    results
  );

  assertEqual(
    Array.from(parseAvailability('Mon-Morning, Nonsense-Slot')),
    ['Mon-Morning'],
    'parseAvailability drops unrecognized tokens',
    results
  );

  {
    const people = [1, 2, 3, 4, 5, 6].map(id => ({ id, slots: new Set(['Mon-Morning']) }));
    const { groups, unmatchedIds } = groupLeads(people, { minSize: 6, maxSize: 12 });
    assertEqual(groups.length, 1, 'groupLeads forms 1 group when exactly minSize share a slot', results);
    assertEqual(groups[0].slot, 'Mon-Morning', 'groupLeads assigns the correct slot', results);
    assertEqual(groups[0].memberIds, [1, 2, 3, 4, 5, 6], 'groupLeads group has all 6 members', results);
    assertEqual(unmatchedIds, [], 'groupLeads leaves nobody unmatched', results);
  }

  {
    const people = [1, 2, 3].map(id => ({ id, slots: new Set(['Mon-Morning']) }));
    const { groups, unmatchedIds } = groupLeads(people, { minSize: 6, maxSize: 12 });
    assertEqual(groups.length, 0, 'groupLeads forms no group below minSize', results);
    assertEqual(unmatchedIds, [1, 2, 3], 'groupLeads marks all as unmatched below minSize', results);
  }

  {
    const people = Array.from({ length: 14 }, (_, i) => ({ id: i + 1, slots: new Set(['Mon-Morning']) }));
    const { groups, unmatchedIds } = groupLeads(people, { minSize: 6, maxSize: 12 });
    assertEqual(groups.length, 1, 'groupLeads caps group size: only 1 group from 14 people', results);
    assertEqual(groups[0].memberIds.length, 12, 'groupLeads group capped at maxSize 12', results);
    assertEqual(unmatchedIds.length, 2, 'groupLeads leaves 2 leftover unmatched (below minSize)', results);
  }

  {
    const groupA = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, slots: new Set(['Mon-Morning']) }));
    const groupB = Array.from({ length: 6 }, (_, i) => ({ id: i + 7, slots: new Set(['Tue-Evening']) }));
    const { groups, unmatchedIds } = groupLeads([...groupA, ...groupB], { minSize: 6, maxSize: 12 });
    assertEqual(groups.length, 2, 'groupLeads forms 2 separate groups across different slots', results);
    assertEqual(unmatchedIds, [], 'groupLeads leaves nobody unmatched across 2 full groups', results);
  }

  {
    const rows = [
      ['firstName', 'lastName', 'email', 'phone', 'lifeGroup', 'availability'],
      ['A', 'B', 'a@x.com', '555', 'Yes', 'Mon-Morning'],
      ['C', 'D', 'c@x.com', '555', 'No', '']
    ];
    const people = buildPeopleFromRows(rows);
    assertEqual(people.length, 2, 'buildPeopleFromRows skips the header row', results);
    assertEqual(people[0].id, 2, 'buildPeopleFromRows maps first data row to sheet row 2', results);
    assertEqual(people[1].id, 3, 'buildPeopleFromRows maps second data row to sheet row 3', results);
    assertEqual(Array.from(people[0].slots), ['Mon-Morning'], 'buildPeopleFromRows parses availability column', results);
    assertEqual(Array.from(people[1].slots), [], 'buildPeopleFromRows handles missing availability', results);
  }

  const failed = results.filter(r => !r.pass);
  return Response.json(
    { total: results.length, passed: results.length - failed.length, failed: failed.length, failures: failed },
    { status: failed.length === 0 ? 200 : 500 }
  );
}
