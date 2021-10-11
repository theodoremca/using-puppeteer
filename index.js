const puppeteer = require("puppeteer");
const fs = require('fs');
const { stringify } = require("querystring");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://simplelineicons.github.io/", {
    waitUntil: "networkidle2",
  });
  const icons = await page.$$eval(".icons", (icons) =>
    icons.map((el) => {
      return { icon: el.className.toString().split("icons")[0].trim() };
    })
  );
  var file = fs.createWriteStream('array.js');
  file.write("icons = [")
  icons.forEach(function(v) { file.write('{icon : '+ '"' + v.icon + '"} ,'+'\n'); });
  file.write("];")
  file.end();

  await browser.close();
})();

