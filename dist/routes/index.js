/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'ITGAM',
    author: 'Alejandro Carreon Gustavo Resendiz',
  });
});
module.exports = router;
