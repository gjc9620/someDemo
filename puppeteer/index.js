const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://juejin.im');
  const text = await page.evaluate(() => Array.from(document.querySelectorAll('.title-row > .title'), element => `${element.textContent} ${element.href}`));
  console.log(text);
  await browser.close();
})();
