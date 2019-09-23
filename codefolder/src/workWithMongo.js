const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
console.log('Inside mongo connect');


module.exports.writeToMongo = (obj1, obj2, obj3) => {

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err){ 
          console.log('Erro mongo: ', err)  
          throw err;}
        console.log("Database created!");

        var dbo = db.db('Puppeteer');
       
        var docs = [obj1,obj2,obj3];

// insert multiple documents to 'users' collection using insertOne
dbo.collection("Cache").insertMany(docs, (err, res) => {
if (err) throw err;
console.log(res.insertedCount+" documents inserted");
// close the connection to db when you are done with it
db.close();
});
      });
}


module.exports.readBankA = () => new Promise((resolve,reject) => {

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err){ 
          console.log('Erro mongo: ', err)  
          throw err;}
        console.log("Database created!");

        var dbo = db.db('Puppeteer');
       
     //var result = dbo.collection("Cache").find({bank:'https://a-bank.com.ua/'}).limit(3);
dbo.collection("Cache").find({bank: "https://a-bank.com.ua/"}).sort({date:-1}).limit(7).toArray(function(err, result) {  
    if (err) throw err; 
    
    console.log('result of guery: ',result); 
    resolve(result);
    db.close();  
  });  

})

})

module.exports.readBankK = () => new Promise((resolve,reject) => {

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err){ 
          console.log('Erro mongo: ', err)  
          throw err;}
        console.log("Database created!");

        var dbo = db.db('Puppeteer');
       
    
dbo.collection("Cache").find({bank: "https://kredobank.com.ua/"}).limit(3).toArray(function(err, result) {  
    if (err) throw err; 
    
    console.log('result of guery: ',result); 
    resolve(result);
    db.close();  
  });  

})

})

module.exports.readBankCA = () => new Promise((resolve,reject) => {

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err){ 
          console.log('Erro mongo: ', err)  
          throw err;}
        console.log("Database created!");

        var dbo = db.db('Puppeteer');
       

dbo.collection("Cache").find({bank: "https://credit-agricole.ua/"}).limit(3).toArray(function(err, result) {  
    if (err) throw err; 
    
    console.log('result of guery: ',result); 
    resolve(result);
    db.close();  
  });  

})

})



//dbo.collection("Cache").find({bank:"https://a-bank.com.ua/"}).limit(3)