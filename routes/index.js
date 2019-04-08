
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
  let qouery = Person.find({ ip: req.ip });
 // console.log(qouery);
  let findOneSignout = -1;
  qouery.sort({ updatedAt: 'descending' });
  
  qouery.exec( function (err, docs) {
  
    if (err) errorHandler(err);
    if (docs) {
       JSON.stringify(docs);
      for (let x = 0; x < docs.length; x++) {
        if (docs[x].signout === true) {
          findOneSignout = x;
          x = docs.length; console.log("signout true autologin: " + JSON.stringify(docs[findOneSignout]));
        }
      }

      if (findOneSignout !== -1) {
        res.send(docs[findOneSignout]);
        //
      } else {
        findall();
        //
      }
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



}).post('/signout', function (req, res, next) {





  // console.log(JSON.stringify(req.body));



  Person.findOne({ _id: JSON.parse(req.body.user_id) }, function (err, docs) {

    if (err) errorHandler(err);

    if (docs) {

      // console.log('signout '+req.body.signout);

      docs.signout = req.body.signout;

      docs.save(function (err) {

        if (err) return handleError(err);

        res.redirect('back');

      });

      //console.log("title: " + docs + 'username already taken');



      //

    }

  });

}).get('/search', function (req, res, next) {



  let search = req.query.search;

  Person.find({}, function (err, docs) {
    if (err) errorHandler(err);
    if (docs) {
      // 
      let newdoc = [];

      for (let x = 0; x < docs.length; x++) {

        for (let y = 0; y < docs[x].polls.length; y++) {

          let name = docs[x].polls[y].name;

          if (name === search) {

            newdoc.push({ mainId: docs[x]._id, subId: docs[x].polls[y]._id, name: docs[x].polls[y].name, comment: docs[x].polls[y].comment });

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
