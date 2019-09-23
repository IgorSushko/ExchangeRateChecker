const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;

const indexRoutes = require('./routes/index');
const puppet = require('./src/Puppetter.js');
const apiRoutes = require('./routes/exchangeApi');

const app = express();
const server = app.listen(8080);
app.use(bodyParser.json()); // bodyParser.urlencoded({ extended: false })
// Required to all static files.
app.set('views', 'templates'); // set folder that include *.ejs files
app.use(express.static('templates'));

//setInterval(() => console.log('Task executed'), 5000);

console.log('Before job instantiation');
const job = new CronJob('0 0/4 * * * *', function() {
	const d = new Date();
  console.log('Every Tenth Minute:', d);
  puppet.TakeExchangeRates()
});
console.log('After job instantiation');
job.start();

app.use('/', indexRoutes);

app.use('/restapi', apiRoutes);

app.use((req, res, next) => {
  console.log('In the 404 middleware44!');
  const path404 = path.join(__dirname, 'templates', 'error404.html');
  res.status(404).sendFile(path404);
});
