const puppeteer = require('puppeteer');

async function start() {
    const url = 'https://finance.yahoo.com/quote/TSLA?p=TSLA&.tsrc=fin-srch';
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: false
    });  
    const page = await browser.newPage();
    await page.waitForTimeout(1000)
    await page.goto(url);
    var accept = ("#consent-page > div > div > div > form > div.wizard-body > div.actions.couple > button");
    await page.click(accept)
    await page.waitForTimeout(1000)
    for(var k = 1; k < 2000; k++){
      var element = await page.waitForXPath("/html/body/div[1]/div/div/div[1]/div/div[2]/div/div/div[5]/div/div/div/div[3]/div[1]/div[1]/span[1]")
      var price = await page.evaluate(element => element.textContent, element);
      console.log(price);
      await page.waitForTimeout(1000)
    }
    browser.close();
}
start();
