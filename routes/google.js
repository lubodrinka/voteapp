/* GET users listing. req.ip
Contains the remote IP address of the request.
When the trust proxy setting does not evaluate to false, the value of this property is derived from the left-most entry in the X-Forwarded-For header. This header can be set by the client or by the proxy.*/
var passport = require('passport')  , util = require('util')  , GoogleStrategy = require('passport-google').Strategy;
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  
  // Use the GoogleStrategy within Passport.
  
  //   Strategies in passport require a `validate` function, which accept
  
  //   credentials (in this case, an OpenID identifier and profile), and invoke a
  
  //   callback with a user object.
  
  passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {    
  
      // To keep the example simple, the user's Google profile is returned to
  
      // represent the logged-in user.  In a typical application, you would want
  
      // to associate the Google account with a user record in your database,
  
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
  ));
  
  // configure Express
  var express = require('express');
  var router = express.Router();
  var app = express();
  
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({ resave: true,
      saveUninitialized: true,secret: 'keyboard cat' }));
    // Initialize Passport!  Also use passport.session() middleware, to support
  
    // Use application-level middleware for common functionality, including
  
  // logging, parsing, and session handling.
  
  app.use(require('morgan')('combined'));
  
  // Initialize Passport and restore authentication state, if any, from the
  
  // session.
  
  app.use(passport.initialize());
  
  app.use(passport.session());

;//process.env.
/* GET home page. */
function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) { return next(); }

  res.redirect('/');

}


  app.get('/auth/google', 

  passport.authenticate('google', { failureRedirect: '/login' }),

  function(req, res) {

    res.redirect('/');

  });



// GET /auth/google/return

//   Use passport.authenticate() as route middleware to authenticate the

//   request.  If authentication fails, the user will be redirected back to the

//   login page.  Otherwise, the primary route function function will be called,

//   which, in this example, will redirect the user to the home page.

app.get('/auth/google/return', 

  passport.authenticate('google', { failureRedirect: '/login' }),

  function(req, res) {

    res.redirect('/');

  });
 app.get('/logout', function(req, res){

  req.logout();

  res.redirect('/');

});







