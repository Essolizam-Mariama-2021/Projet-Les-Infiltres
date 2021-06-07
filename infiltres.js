
const puppeteer = require ('puppeteer');

const {installMouseHelper} = require('./install-mouse-helper');

function generateDelay(){
  var min=150;
  var max=350;
  return Math.random() * (max - min) + min;

}
const connec = async brow => {
    const page = await brow.newPage()
    await installMouseHelper(page);
    await page.mouse.move(135, 173);
    await page.mouse.down();
    await page.mouse.move(400, 225);
    
    await page.goto("https://fr.linkedin.com/",{waitUntil: 'networkidle0',})
    await page.waitForTimeout('body')
    await page.click("body > nav > div > a.nav__button-secondary",{waitUntil: 'networkidle0',})
    await page.waitForSelector('#username')
    
    const use = await page.$('#username');
    const bounding_box = await use.boundingBox();
  
    await use.click('#username');
    var email= "22012596@etu.unicaen.fr";
    var lenghtEmail= email.length;
    for(i=0; i<lenghtEmail; i++){
      var caract= email[i];
      await page.type('#username',caract, {delay: generateDelay()});
    }
    await page.click('#password');
    var pass= "Ebenezer5-8";
    var lenghtPass= pass.length;
    for(i=0; i<lenghtPass; i++){
      var caract= pass[i];
      await page.type('#password',caract, {delay: generateDelay()});
    } 
    await page.click('#organic-div > form > div.login__form_action_container > button',{waitUntil: 'networkidle0',})
    await page.waitForSelector('button.global-nav__primary-link');
    await page.waitForTimeout(3000); 
    await page.click("div > header > div > div > div.search-global-typeahead.global-nav__search-typeahead",{waitUntil: 'networkidle0',})
    
  var keyWord = ['Enedis'];    
    for (const element of keyWord) {
        await page.type('input[type="text"]', element, {delay: 300});
        await page.keyboard.press('\r');
        await page.waitForTimeout(3000);
        await page.click('[aria-label="Entreprises "]');
      
        var i = 0;
        var j = 5;
        while(i < j) {
          await page.waitForTimeout(3000);
          var nomEnt = await page.$$eval("span.entity-result__title-text.t-16",
              elements=> elements.map(item=>item.textContent))
              console.log(nomEnt);
          var desEnt = await page.$$eval("div.entity-result__primary-subtitle.t-14.t-black",
              elements=> elements.map(item=>item.textContent))
               console.log(desEnt);
               await page.click('[aria-label="Suivre"]')[0];
              i = i + 1;
        }
        
        await page.click('[aria-label="Entreprises "]');
        await page.waitForTimeout(1000);
        await page.click(".search-reusables__navigation-filter-dropdown-item")[1];
        
      }
    };
    function delay(time) {
      return new Promise(function(resolve) { 
          setTimeout(resolve, time)
      });
    } 
    
    
function findSuivre(query) {
    var tab = [];
    for(var i = 0; i < query.length; i++){
      if( query[i].getAttribute("aria-label").equals("Suivre") ){
        tab.push(i);
      } else {}
    }
    return tab;
  }
const exec = async () => {
  const browser = await puppeteer.launch({
  	headless: false,
  	args: ['--start-maximized'],
  	defaultViewport: null,
  	waitUntil: 'networkidle2',
  });
  
  await connec(browser) 
  
}
exec()