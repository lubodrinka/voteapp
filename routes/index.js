
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res) {
  res.redirect('/autologin');
}).get('/autologin', function (req, res, next) {

  // console.log('approot'+req.body.user);
  let qouery = Person.find({ ip: req.ip });
  // console.log(qouery);
  let findOneSignout = -1;
  qouery.sort({ updatedAt: 'descending' });

  qouery.exec(function (err, docs) {

    if (err) errorHandler(err);
    if (docs) {
      // JSON.stringify(docs);
      for (let x = 0; x < docs.length; x++) {
        if (docs[x].signout === true) {
          findOneSignout = x;
          x = docs.length; console.log("signout true autologin: " + JSON.stringify(docs[findOneSignout]));
        }
      }
      if (findOneSignout !== -1) {

        req.session.user = { social: docs[findOneSignout].social, name: docs[findOneSignout].name, url: docs[findOneSignout].url, id: docs[findOneSignout].id, _id: docs[findOneSignout]._id, };
        req.session.save(function (err) {
          // session saved 
          //  res.send(docs[findOneSignout]);
          res.render('layout', { user: req.session.user });
        });

      } else {
        res.redirect('/allpolls');
        //
      }



      console.log(req.session);
      //
    }
  });


}).get('/mypolls', function (req, res, next) {

  //

  console.log(req.session.user);
  Person.findOne({ _id: req.session.user._id }, function (err, docs) {
    if (err) errorHandler(err);
    if (docs) {
      //  console.log('myPoll username already taken');
      console.log("title: " + docs + 'username already taken');
      //res.send(docs);
      res.render('indexmy', { data: docs, user: req.session.user });
      //
    } else {
      Person.findOne({ ip: req.ip }, function (err, docs) {
        if (err) errorHandler(err);
        if (docs) {
          res.render('indexmy', { data: docs, user: req.session.user });
          // res.send(docs);

        }
      });
    }
  })
    ;


}).get('/allpolls', function (req, res, next) {

  // console.log(req.body);
  Person.find({}, function (err, docs) {
    if (err) errorHandler(err);

    if (docs) {

      //console.log("title: " + docs + 'username already taken');

      res.render('index', { data: docs, user: req.session.user });
      //console.log('allPolll username already taken');

      // res.send(docs);
      //
    } else {

      res.json({ name: 'first register first' });
    }
  });

  //console.log('no username already taken');  



}).get('/signout', function (req, res, next) {





  // console.log(JSON.stringify(req.body));



  Person.findOne({ _id: req.session.user._id }, function (err, docs) {

    if (err) errorHandler(err);

    if (docs) {

      // console.log('signout '+req.body.signout);

      docs.signout = false;

      docs.save(function (err) {

        if (err) return errorHandler(err);
        req.session.destroy();
        req.logout();
        res.redirect('/');

      });

      //console.log("title: " + docs + 'username already taken');



      //

    }

  });

}).get('/search', function (req, res, next) {



  let search = req.query.search;

  Person.find({ 'polls.name': search }).lean().exec(function (err, docs) {
    if (err) errorHandler(err);
    let tempDocs = JSON.parse(JSON.stringify(docs.slice()));
    if (docs) {



      for (let x = 0; x < docs.length; x++) {
        if (docs[x].hasOwnProperty('polls')) {


          for (let y = docs[x].polls.length - 1; y != -1; y--) {

            let name = docs[x].polls[y].name;
            console.log(name + search + (name != search));
            if (name != search) {
              let erses = tempDocs[x].polls.splice(y, 1);

            }
          }
        } else {
          tempDocs.splice(y, 1);
        }

      }
      //console.log((docs[0].polls.length));
      res.render('index', { data: tempDocs, user: req.session.user });
      //
    } else {
      res.status(404).send("no");
    }
  });
});





module.exports = router;
