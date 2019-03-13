
var express = require('express');
var router = express.Router();



router.get('/autologin', function(req, res, next) {  

  //

  console.log('approot'+'req.ip');
  Person.findOne({ ip: req.ip }, function (err, docs) {
    if (err) errorHandler(err);
        if (docs) {
          console.log('username already taken');
 //console.log("title: " + docs + 'username already taken');
  res.send(docs);
  //
    } else {

Person.find({}, function(err, docs){
  if (err) errorHandler(err);
        if (docs) {
          console.log('username already taken');
  //console.log("title: " + docs + 'username already taken');



  res.send(docs);
  //
    } else {

     res.json( { name: 'first register first'  }) ;
    }
 } );


 

     //console.log('no username already taken');  
  }    
  }); 






});
router.delete('/home', function(req, res, next) {  
  var project = req.params.project;
     var DataDBinfo = mongoose.model(project, blogSchema);
   
   // console.log('del: ' + project + 'body:' + JSON.stringify(req.body));
    var name = req.body.name;
  
  if (!Boolean(name))  {
    // console.log('del: ' + Boolean(name));
    res.send( 'name error'); 
    return'name error';}
    DataDBinfo.findONe({name:name}, function (err, doc) {
      if (err) {          res.send('name error');        } // handle error
    //  console.log("titledel: " + doc);
      doc.remove(function (err) {
        if (err) return res.send('could not delete '+name);
        res.send('success: deleted '+name);
      }); //Removes the document
    });
  });
  



module.exports = router;
