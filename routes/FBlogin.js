



var express = require('express');


var passport = require('passport');

var Strategy = require('passport-facebook').Strategy;



var trustProxy = true;
/*
if (process.env.DYNO) {

  // Apps on heroku are behind a trusted proxy

  trustProxy = true;

}
*/

// Configure the facebook strategy for use by Passport.

//

// OAuth 1.0-based strategies require a `verify` function which receives the

// credentials (`token` and `tokenSecret`) for accessing the facebook API on the

// user's behalf, along with the user's profile.  The function must invoke `cb`

// with a user object, which will be set at `req.user` in route handlers after

// authentication.

passport.use(new Strategy({
  clientID: process.env.FB_CLIENT_ID,

  clientSecret: process.env.FB_CLIENT_SECRET,

  callbackURL: "/oauth/facebook/callback",

  profileFields: ['id', 'displayName', 'photos'],
  enableProof: true,
  proxy: trustProxy


},

  function (token, tokenSecret, profile, cb) {

    // In this example, the user's facebook profile is supplied as the user

    // record.  In a production-quality application, the facebook profile should

    // be associated with a user record in the application's database, which

    // allows for account linking and authentication with other identity

    // providers.
    //
    // let recipes = JSON.parse(sessionStorage.getItem(this.state.user)) || [];
    let profilejSOn = (profile.json);

    // console.log("§§!"+profile.displayName);

    // console.log(profile.photos[0].value);
    //sessionStorage.setItem(1,  JSON.stringify({Name:profilejSOn.displayName ,Photo:profilejSOn.photos[0].value}));

    Person.findOne({ id: profile.id }, function (err, docs) {

      if (err) errorHandler(err);
      if (docs) {
        docs.signout = false;
        docs.signout = true;
        docs.save(function (err) {
          if (err) return errorHandler(err);
           return cb(null, docs);
        });
       
      } else {
        return cb(null, profile);
      }

    });



  }));





// Configure Passport authenticated session persistence.

//

// In order to restore authentication state across HTTP requests, Passport needs

// to serialize users into and deserialize users out of the session.  In a

// production-quality application, this would typically be as simple as

// supplying the user ID when serializing, and querying the user record by ID

// from the database when deserializing.  However, due to the fact that this

// example does not have a database, the complete facebook profile is serialized

// and deserialized.

passport.serializeUser(function (user, cb) {
console.log(116+user);
  cb(null, user._id);

});



passport.deserializeUser(function (obj, cb) {
  Person.findOne({ _id: obj }, function (err, docs) {

    if (err) errorHandler(err);
    if (docs) {
      cb(null, docs);
    } else {
      cb(null, obj);
    }

  });


});





// Define routes.

app = express();


// Use application-level middleware for common functionality, including

// logging, parsing, and session handling.



// Initialize Passport and restore authentication state, if any, from the

// session.






app.get('/login',

  function (req, res) {

    console.log('ENV');

    console.log(process.env);

    console.log('Headers:');

    console.log("!req.headers!" + req.headers);

    res.render('login');

  });

app.get('/login/facebook',

  passport.authenticate('facebook')
);

app.get('/oauth/facebook/callback',

  passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {

    Person.findOne({ ip: req.ip, id: req.user.id }, function (err, docs) {
      if (err) errorhandler(err);
      if (docs) {
        
        docs.signout = true;
        docs.save(function (err) {
          if (err) return handleError(err);
        });
      } else {

        const kitty = new Person({ signout: true, ip: req.ip, social: 'facebook', name: req.user.displayName, url: req.user.photos[0].value, id: req.user.id });
        kitty.save().then(() => console.log('new Person save' + docs));


      }


    });
    res.redirect('/autologin');
  });


app.get('/profile',

  require('connect-ensure-login').ensureLoggedIn(),

  function (req, res) {

    console.log("profile send");
    res.render('profile', { user: req.user });

  });









module.exports = app;

