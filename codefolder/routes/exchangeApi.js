const express = require('express');

const firstController = require('../controllers/exchangeApi');

const router = express.Router();

// GET /feed/posts
router.get('/getDataA', firstController.provideAddressA );

// router.get('/getDataK', );

// router.get('/getDataCA', );


//http://localhost:8080/restapi/getDataA
//http://localhost:8080/restapi/getDataK
//http://localhost:8080/restapi/getDataCA

module.exports = router;