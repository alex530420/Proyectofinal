"use strict";

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'ITGAM',
    author: 'Resendiz Gustavo-Carreron Alejandro'
  });
});
module.exports = router;