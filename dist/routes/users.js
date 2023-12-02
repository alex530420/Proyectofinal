/* eslint-disable no-unused-vars */
/* eslint-disable lines-around-directive */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */


var express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

// GET /user/author
router.get('/author', (req, res, next) => {
  res.render('author', {
    author: "Alejandro Carreon"
  });
});
module.exports = router;