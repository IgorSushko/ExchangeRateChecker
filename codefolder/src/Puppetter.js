const puppeteer = require('puppeteer');
const Mongotest = require ('../src/workWithMongo.js')
const bankObj = require ('../src/utils.js')

var objBankvar ={
      a:'',
      b:'',
      c:''
}
//const contentdata = require('./src/workwithfs.js');

process.env.FILES_ROOT_FOLDER = '.';

module.exports.TakeExchangeRates= async () => {
    const browser = await puppeteer.launch()
  
    const currentTime = Date.now();
    console.log('Current Time :',currentTime);
    console.log('Bank: ','https://a-bank.com.ua/');
    const page = await browser.newPage()
    await page.tracing.start({path: 'trace.json', categories: ['devtools.timeline']})   
    const aBankUrl = 'https://a-bank.com.ua/';
    await page.goto('https://a-bank.com.ua/')
    await page.setViewport({ width: 1920, height: 1080})
    
    try{ 
        await page.waitForSelector('.b-side > .ex-rates > .module-ex-rates-widget > .item > .item__rate')
        await page.click('.b-side > .ex-rates > .module-ex-rates-widget > .item > .item__rate')
        
        await page.waitForSelector('.ex-rates > .module-ex-rates-widget > .standalone-wrapper > .module-ex-rates-standalone > .list__item:nth-child(4)')
        await page.click('.ex-rates > .module-ex-rates-widget > .standalone-wrapper > .module-ex-rates-standalone > .list__item:nth-child(4)')   
        const nameEvro = await page.$eval('.ex-rates > .module-ex-rates-widget > .standalone-wrapper > .module-ex-rates-standalone > .list__item:nth-child(4)', el => el.innerText);
        const nameDollar = await page.$eval('.ex-rates > .module-ex-rates-widget > .standalone-wrapper > .module-ex-rates-standalone > .list__item:nth-child(3)', el => el.innerText);
        
        let abankDollarA = nameDollar.replace('"','')
        let abankDollar = abankDollarA.split('\n');
        let abankEvroA = nameEvro.replace('"','')
        let abankEvro = abankEvroA.split('\n');
        abankDollar[1]=+abankDollar[1]*100;
        abankDollar[2]=+abankDollar[2]*100;
        abankEvro[1] = +abankEvro[1]*100;
        abankEvro[2] = +abankEvro[2]*100;

         const aBankObj = bankObj.createBankDetails(aBankUrl,abankDollar[1],abankDollar[2],abankEvro[1],abankEvro[2],currentTime);
        console.log('***********************************')
        console.log(aBankObj);
        objBankvar.a = aBankObj;
        
     } 
     catch(err)
    {
      console.log('something inside : ', err)
      return;
    }
  
  
    await page.tracing.stop();
    await page.close();
 //********************************************************************************************************** */
 const currentTime1 = Date.now();
 console.log('Current Time :',currentTime1);
 console.log('Bank: ','https://kredobank.com.ua/');
    const pagek = await browser.newPage()
    await pagek.tracing.start({path: 'trace.json', categories: ['devtools.timeline']})    
    const kredoBankUrl = 'https://kredobank.com.ua/';
    await pagek.goto('https://kredobank.com.ua/')
    await pagek.setViewport({ width: 1920, height: 1080})
    
    try{
        
              
        await pagek.waitForSelector('.table > .table__main:nth-child(2) > table > tbody > tr:nth-child(1)')
        await pagek.click('.table > .table__main:nth-child(2) > table > tbody > tr:nth-child(1)')
             
        const nameDollark = await pagek.$eval('.table > .table__main:nth-child(2) > table > tbody > tr:nth-child(1)', el => el.innerText);
        const nameEvrok = await pagek.$eval('.table > .table__main:nth-child(2) > table > tbody > tr:nth-child(2)', el => el.innerText);
        let kredoDollar = nameDollark.split('\t');
        let kredoEvro = nameEvrok.split('\t');
        
         const krBankObj = bankObj.createBankDetails(kredoBankUrl,kredoDollar[1],kredoDollar[2],kredoEvro[1],kredoEvro[2],currentTime1);
         console.log('***********************************')
         console.log(krBankObj);
       
        objBankvar.b= krBankObj;
          

     } 
     catch(err)
    {
      console.log('something inside : ', err)
      return;
    }
  
  
    await pagek.tracing.stop();
    await pagek.close();  
     //********************************************************************************************************** */
     const currentTime1a = Date.now();
 console.log('Current Time :',currentTime1a);
 console.log('Bank: ','https://credit-agricole.ua/');
    const pageka = await browser.newPage()
    await pageka.tracing.start({path: 'trace.json', categories: ['devtools.timeline']})    
    const caBankUrl = 'https://credit-agricole.ua/';
    await pageka.goto('https://credit-agricole.ua/')
    await pageka.setViewport({ width: 1920, height: 1080})
    
    try{
        
        
        await pageka.waitForSelector('.body > .exchange-rates-table > table > tbody > tr:nth-child(1)')
        await pageka.click('.body > .exchange-rates-table > table > tbody > tr:nth-child(1)')
             
        const nameDollarCA = await pageka.$eval('.body > .exchange-rates-table > table > tbody > tr:nth-child(1)', el => el.innerText);
        const nameEvroCA = await pageka.$eval('.body > .exchange-rates-table > table > tbody > tr:nth-child(2)', el => el.innerText);
        let creditADollar = nameDollarCA.split('\t');
        let creditAEvro = nameEvroCA.split('\t');
        creditADollar[1]=+creditADollar[1]*100;
        creditADollar[2]=+creditADollar[2]*100;
        creditAEvro[1] = +creditAEvro[1]*100;
        creditAEvro[2] = +creditAEvro[2]*100;
      
        const caBankObj = bankObj.createBankDetails(caBankUrl,creditADollar[1],creditADollar[2],creditAEvro[1],creditAEvro[2],currentTime1a);
        console.log('***********************************')
        console.log(caBankObj);
        objBankvar.c = caBankObj;
        
     } 
     catch(err)
    {
      console.log('something inside: ', err)
      return;
    }
  
  
    await pageka.tracing.stop();
    await pageka.close();   
    
    
    await browser.close()

    const addToDB = Mongotest.writeToMongo(objBankvar.a,objBankvar.b,objBankvar.c);

  };

  
    