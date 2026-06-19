export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const BLOCKS = ['Morning', 'Afternoon', 'Evening'];
export const ALL_SLOTS = DAYS.flatMap(day => BLOCKS.map(block => `${day}-${block}`));

export function parseAvailability(availabilityStr) {
  if (!availabilityStr) return new Set();
  const tokens = availabilityStr.split(',').map(s => s.trim()).filter(Boolean);
  return new Set(tokens.filter(t => ALL_SLOTS.includes(t)));
}

export function groupLeads(people, { minSize = 6, maxSize = 12 } = {}) {
  const unassigned = new Map(people.map(p => [p.id, p.slots]));
  const groups = [];

  while (true) {
    let bestSlot = null;
    let bestCount = 0;

    for (const slot of ALL_SLOTS) {
      let count = 0;
      for (const slots of unassigned.values()) {
        if (slots.has(slot)) count++;
      }
      if (count > bestCount) {
        bestCount = count;
        bestSlot = slot;
      }
    }

    if (bestSlot === null || bestCount < minSize) break;

    const memberIds = [];
    for (const [id, slots] of unassigned) {
      if (slots.has(bestSlot)) {
        memberIds.push(id);
        if (memberIds.length === maxSize) break;
      }
    }

    for (const id of memberIds) unassigned.delete(id);
    groups.push({ slot: bestSlot, memberIds: memberIds.sort((a, b) => a - b) });
  }

  return { groups, unmatchedIds: Array.from(unassigned.keys()).sort((a, b) => a - b) };
}
