const express = require('express');

const secondController = require('../controllers/index');

const router = express.Router();


router.get('/', secondController.provideGetPageIndex);

router.post('/', secondController.providePostPageIndex);

module.exports = router;