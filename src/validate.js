// Standalone data check: node src/validate.js
// The build runs the same validation before rendering.

import { validateData } from './lib/validate.js';

const counts = validateData();
console.log(
  `Data OK: ${counts.tools} tools, ${counts.pairs} pairs, ${counts.frameworks} frameworks, ${counts.segments} segments, ${counts.guides} guides.`
);
