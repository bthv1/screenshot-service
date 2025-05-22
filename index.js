const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--headless'
    ],
    executablePath: process.env.CHROME_BIN || null
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  const url = process.env.TARGET_URL || "https://example.com";
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.screenshot({
    path: path.join(__dirname, 'public', 'latest.png'),
    clip: { x: 0, y: 0, width: 1200, height: 400 }
  });

  await browser.close();
})();
