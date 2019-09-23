const path = require('path');
const Mongotest = require ('../src/workWithMongo.js')

async function getRecords() {
    const myData = [];
    const tempData = await Mongotest.readBankA();
    tempData.forEach((result) => {
      myData.push(result);
    });
    return myData;
  }


exports.provideAddressA = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  getRecords().then((tempData) => {res.status(200).json({ Data: tempData})});
  

};
