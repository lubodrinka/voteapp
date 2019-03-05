
var express = require('express');
var router = express.Router();
router.get('/home', function(req, res, next) {  

  res.render('index', { title: 'Express1 Login'}) ;
/*res.redirect('/');*/
});


module.exports = router;
