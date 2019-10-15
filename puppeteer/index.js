const puppeteer = require('puppeteer');

function a(){
  console.log('aa');
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://juejin.im');
  // const texts = page.evaluate(() => document.querySelectorAll('.scrape').map(v=>v.textContent));
  // console.log(texts);
  
  // const textContent = await page.evaluate(() => document.querySelector('p').textContent);
  // const innerText = await page.evaluate(() => document.querySelector('p').innerText);
  const text = await page.evaluate(() => Array.from(document.querySelectorAll('.title-row > .title'), element => `${element.textContent} ${element.href}`));
  
  const bodyHTML =
  await page.evaluate(
    () => document.body.innerHTML
  );
  
  // console.log(textContent);
  console.log(bodyHTML);
  console.log(text);
  
  await browser.close();
  
})();
