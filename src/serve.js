// Tiny static dev server for previewing dist/. Not for production.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(join(dirname(fileURLToPath(import.meta.url)), '..', 'dist'));
const PORT = process.env.PORT || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function notFound() {
  return readFile(join(DIST, '404.html'));
}

createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);

    // A path without a file extension acts like a directory: redirect
    // /tools/vanta to /tools/vanta/ so relative links behave.
    if (!path.endsWith('/') && !extname(path)) {
      res.writeHead(301, { location: path + '/' });
      res.end();
      return;
    }

    const file = resolve(DIST, '.' + path);
    // Guard against path traversal: resolved files must stay inside dist/.
    if (file !== DIST && !file.startsWith(DIST + sep)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    let data;
    try {
      data = await readFile(path.endsWith('/') ? join(file, 'index.html') : file);
    } catch {
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      res.end(await notFound());
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end(String(err));
  }
}).listen(PORT, () => {
  console.log(`Preview: http://localhost:${PORT}`);
});
