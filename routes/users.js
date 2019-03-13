//'use strict';
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
  res.render('index', {title:'Home'});
  // res.send('respond with a resource' + req.ip);
});

module.exports = router;
