import { parseAvailability, ALL_SLOTS } from '../lib/grouping.js';

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

  const failed = results.filter(r => !r.pass);
  return Response.json(
    { total: results.length, passed: results.length - failed.length, failed: failed.length, failures: failed },
    { status: failed.length === 0 ? 200 : 500 }
  );
}
