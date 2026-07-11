import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });

const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));
const broken = [];
let checked = 0;

const resolvesToFile = (pathname) => {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!clean) return fs.existsSync(path.join(root, 'index.html'));

  const direct = path.join(root, clean);
  if (path.extname(clean)) return fs.existsSync(direct);

  return fs.existsSync(path.join(direct, 'index.html')) || fs.existsSync(`${direct}.html`);
};

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const hrefs = [...html.matchAll(/\shref=["']([^"']+)["']/g)].map((match) => match[1]);

  for (const href of hrefs) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const url = new URL(href, 'https://copper3dp.com');
    checked += 1;

    if (!resolvesToFile(url.pathname)) {
      broken.push({ source: path.relative(root, file).replaceAll('\\', '/'), href });
    }
  }
}

console.log(JSON.stringify({ htmlFiles: htmlFiles.length, checkedInternalLinks: checked, broken }, null, 2));

if (broken.length > 0) process.exitCode = 1;
