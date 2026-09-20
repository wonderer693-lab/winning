// Small shared helpers. No dependencies.

export function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Lowercases only the first character, so brand names later in the
// string keep their capitalization.
export function lowerFirst(value) {
  const s = String(value ?? '');
  return s.charAt(0).toLowerCase() + s.slice(1);
}

// JSON-LD must not contain a literal "<" or the script block can break.
export function jsonLd(data) {
  const json = JSON.stringify(data).replaceAll('<', '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

export function isoDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function truncate(value, length = 160) {
  const text = String(value ?? '').trim();
  if (text.length <= length) return text;
  return text.slice(0, length - 1).replace(/\s+\S*$/, '') + '…';
}

// Returns `count` items from `list` starting at `start`, wrapping around.
// Used to rotate "related" grids so no page always links the same first items.
export function windowAround(list, start, count) {
  if (list.length <= count) return list;
  return Array.from({ length: count }, (_, i) => list[(start + i) % list.length]);
}

// Simple yes/partial/no cell marker used in comparison tables.
export function mark(value) {
  if (value === undefined || value === null) return { cls: 'mark', label: '—' };
  if (value === true || value === 'yes') return { cls: 'mark mark--yes', label: 'Yes' };
  if (value === 'partial') return { cls: 'mark mark--partial', label: 'Partial' };
  if (value === false || value === 'no') return { cls: 'mark mark--no', label: 'No' };
  return { cls: 'mark', label: String(value) };
}
