export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const BLOCKS = ['Morning', 'Afternoon', 'Evening'];
export const ALL_SLOTS = DAYS.flatMap(day => BLOCKS.map(block => `${day}-${block}`));

export function parseAvailability(availabilityStr) {
  if (!availabilityStr) return new Set();
  const tokens = availabilityStr.split(',').map(s => s.trim()).filter(Boolean);
  return new Set(tokens.filter(t => ALL_SLOTS.includes(t)));
}
