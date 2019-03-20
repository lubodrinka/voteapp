
var express = require('express');
var router = express.Router();



router.post('/autologin', function (req, res, next) {

  function findall() {
    Person.find({}, function (err, docs) {
      if (err) errorHandler(err);
      if (docs) {
        // console.log('username already taken');
        //console.log("title: " + docs + 'username already taken');

        res.send(docs);
      } else {

        res.json({ name: 'first register first' });
      }
    });
  }
  // console.log('approot'+req.body.user);
  Person.findOne({ ip: req.ip }, function (err, docs) {
    if (err) errorHandler(err);
    if (docs) {
      // console.log('username already taken');
      //console .log("signout true autologin: " + docs.signout);
      if (docs.signout === true) {
        res.send(docs);
      } else {
        findall();
      }
      //
    } else {

      findall();
      //

    }
  });

}).post('/mypolls', function (req, res, next) {

  //


  Person.findOne({ _id: JSON.parse(req.body.user_id) }, function (err, docs) {
    if (err) errorHandler(err);
    if (docs) {
      //  console.log('myPoll username already taken');
      //console.log("title: " + docs + 'username already taken');
      res.send(docs);
      //
    } else {
      Person.findOne({ ip: req.ip }, function (err, docs) {
        if (err) errorHandler(err);
        if (docs) {

          res.send(docs);
          //
        }
      });
    }
  })
    ;


}).post('/allpolls', function (req, res, next) {

  // console.log(req.body);
  Person.find({}, function (err, docs) {
    if (err) errorHandler(err);

    if (docs) {

      //console.log('allPolll username already taken');
      //console.log("title: " + docs + 'username already taken');
      res.send(docs);
      //
    } else {

      res.json({ name: 'first register first' });
    }
  });

  //console.log('no username already taken');  



}).get('/search', function (req, res, next) {


  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req.query));
  let search = req.query.search;
  console.log(search);
  Person.find({}, function (err, docs) {
    if (err) errorHandler(err);
    if (docs) {
      // 
      let newdoc=[];

      for (x = 0; x < docs.length ; x++) {
     
                 
        for (y = 0; y < docs[x].polls.length ; y++) {           
            
            let name = docs[x].polls[y].name; 

             if (name === search) {
               
            newdoc.push( {mainId:docs[x]._id, subId:docs[x].polls[y]._id,name:docs[x].polls[y].name,comment:docs[x].polls[y].comment});
       
          }                  
        }
      }

 res.send(newdoc);
      //
    } else {
      res.status(404).send("no");
    }
  });
});





module.exports = router;
