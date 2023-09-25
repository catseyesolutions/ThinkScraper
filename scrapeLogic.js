const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res, req) => {

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=7d4132c8-06b0-4b92-b809-388609642558`,
  });
  
  try {
    const page = await browser.newPage();
    
    await page.goto(req.query.url, {
      waitUntil: 'networkidle0',
    });
    
    const html = await page.content();
  
    res.send({
        html
    });

  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
