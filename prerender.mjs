import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const routes = ['/', '/cista-mzda', '/pujcka', '/rocni-dane'];
const buildDir = './build';
const port = 5050;

const server = spawn('npx', ['serve', '-s', 'build', '-l', String(port)], {
  stdio: 'ignore',
  shell: true,
  detached: false
});

await new Promise(r => setTimeout(r, 3000));

// Netlify má Chromium na jiné cestě než lokální Windows
const isCI = process.env.CI === 'true';

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: isCI ? '/usr/bin/chromium-browser' : undefined,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});

for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}${route}`, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  const html = await page.content();

  const dir = path.join(buildDir, route === '/' ? '' : route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`✅ Prerendered: ${route}`);
  await page.close();
}

await browser.close();
server.kill();
console.log('🎉 Prerendering dokončen!');
process.exit(0);
