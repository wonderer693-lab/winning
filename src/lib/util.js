// Small shared helpers. No dependencies.

export function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function slugify(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// JSON-LD needs </script> escaped or the script block breaks.
export function jsonLd(data) {
  const json = JSON.stringify(data).replaceAll('</', '<\\/');
  return `<script type="application/ld+json">${json}</script>`;
}

export function isoDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

// "2026-09-20" -> "Sep 20, 2026"
export function prettyDate(iso) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [y, m, d] = String(iso).split('-').map(Number);
  if (!y || !m || !d) return String(iso);
  return `${months[m - 1]} ${d}, ${y}`;
}

export function truncate(value, length = 160) {
  const text = String(value ?? '').trim();
  if (text.length <= length) return text;
  return text.slice(0, length - 1).replace(/\s+\S*$/, '') + '…';
}

// Simple yes/partial/no cell marker used in comparison tables.
export function mark(value) {
  if (value === true || value === 'yes') return { cls: 'mark mark--yes', label: 'Yes' };
  if (value === 'partial') return { cls: 'mark mark--partial', label: 'Partial' };
  if (value === false || value === 'no') return { cls: 'mark mark--no', label: 'No' };
  return { cls: 'mark', label: String(value) };
}
