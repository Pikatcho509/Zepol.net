const http = require('http');
const fs   = require('fs');
const path = require('path');
const root = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jfif': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
  '.woff2':'font/woff2',
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';
  // Decode + normalize, then ensure the resolved path stays inside root
  // (prevents path-traversal like /../../etc/passwd).
  let decoded;
  try { decoded = decodeURIComponent(url); } catch { decoded = url; }
  const file = path.normalize(path.join(root, decoded));
  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404); res.end('Not found: ' + url); return;
    }
    const ext  = path.extname(file).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': mime,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
});

const PORT = process.env.PORT || 8765;
server.listen(PORT, () => {
  console.log(`\n✅  Zepòl → http://localhost:${PORT}\n`);
});
