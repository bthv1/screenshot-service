const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');
const path = require('path');

(async () => {
  const executablePath = await chromium.executablePath;
  
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  const url = process.env.TARGET_URL || "https://vert.eco";
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.screenshot({
    path: path.join(__dirname, 'public', 'latest.png'),
    clip: { x: 0, y: 0, width: 1200, height: 400 }
  });

  await browser.close();
})();
