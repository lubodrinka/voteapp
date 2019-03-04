var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */

router
.post('/login', function(req, res, next) { 
 
  

  res.render('index', { title: 'Express1 Login'+req.ip}) ;
/*res.redirect('/');*/
});





module.exports = router;
