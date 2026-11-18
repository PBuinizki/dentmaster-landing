/**
 * Postbuild fix: adds the basePath prefix to all static asset paths
 * in the generated HTML files, since `assetPrefix` is not applied
 * to <link preload> image URLs by Next.js `output: 'export'`.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, '..', 'out');
const BASE_PATH = '/dentmaster-landing';

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix <img src="/images/..." >
  content = content.replace(/(src=")\/images\//g, `$1${BASE_PATH}/images/`);

  // Fix <link preload ... href="/images/..."
  content = content.replace(/(href=")\/images\//g, `$1${BASE_PATH}/images/`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  fixed: ${path.relative(path.join(__dirname, '..'), filePath)}`);
  }
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error('out/ directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const files = walk(OUT_DIR).filter((f) => f.endsWith('.html'));
  for (const file of files) {
    fixFile(file);
  }
  console.log('Postbuild paths fixed.');
}

main();
