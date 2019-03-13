
var express = require('express');
var router = express.Router();



router.post('/autologin', function(req, res, next) { 

  function findall(){
    Person.find({}, function(err, docs){
  if (err) errorHandler(err);
        if (docs) {
          console.log('username already taken');
  //console.log("title: " + docs + 'username already taken');

  res.send(docs);
  }  else {

     res.json( { name: 'first register first'  }) ;
    }
});}
  console.log('approot'+req.body.user);
  Person.findOne({ ip: req.ip }, function (err, docs) {
    if (err) errorHandler(err);
        if (docs) {
          console.log('username already taken');
 console.log("signout true autologin: " + docs.signout);
      if(docs.signout===true){
       res.send(docs);
          }else{
         findall();
            }
    //
    } else {

findall();
  //
   
 } });

}).post('/mypolls', function(req, res, next) { 

  //
console.log(req.query);
console.log(req.body);
  Person.findOne({ name: req.body.user }, function (err, docs) {
    if (err) errorHandler(err);
        if (docs) {
          console.log('myPoll username already taken');
 //console.log("title: " + docs + 'username already taken');
  res.send(docs);
  //
    } });
 }).post('/allpolls', function(req, res, next) { 
   // console.log(req.body);
Person.find({}, function(err, docs){
  if (err) errorHandler(err);
        if (docs) {
          console.log('allPolll username already taken');
  //console.log("title: " + docs + 'username already taken');

  res.send(docs);
  //
    } else {

     res.json( { name: 'first register first'  }) ;
    }
 } );

     //console.log('no username already taken');  
      
  

}).post('/signout', function(req, res, next) { 

  //


  Person.findOne({ name: req.body.user }, function (err, docs) {
    if (err) errorHandler(err);
        if (docs) {
          console.log('signout '+req.body.signout);
          docs.signout=req.body.signout;
           docs.save(function (err) {
if (err) return handleError(err);
res.redirect('back'); });
 //console.log("title: " + docs + 'username already taken');
 
  //
    } });
 });

  



module.exports = router;
