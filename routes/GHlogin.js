



var express = require('express');


var passport = require('passport');

var Strategy = require('passport-github').Strategy;



var trustProxy = false;
/*
if (process.env.DYNO) {

  // Apps on heroku are behind a trusted proxy

  trustProxy = true;

}
*/

// Configure the Twitter strategy for use by Passport.

//

// OAuth 1.0-based strategies require a `verify` function which receives the

// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the

// user's behalf, along with the user's profile.  The function must invoke `cb`

// with a user object, which will be set at `req.user` in route handlers after

// authentication.

passport.use(new Strategy({


  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/oauth/github/callback",

  proxy: trustProxy

},

  function (token, tokenSecret, profile, cb) {

    // In this example, the user's Twitter profile is supplied as the user

    // record.  In a production-quality application, the Twitter profile should

    // be associated with a user record in the application's database, which

    // allows for account linking and authentication with other identity

    // providers.
    //
    // let recipes = JSON.parse(sessionStorage.getItem(this.state.user)) || [];
    let profilejSOn = (profile.json);

    // console.log("§§!"+profile.displayName);

    // console.log(profile.photos[0].value);
    //sessionStorage.setItem(1,  JSON.stringify({Name:profilejSOn.displayName ,Photo:profilejSOn.photos[0].value}));
    return cb(null, profile);

  }));





// Configure Passport authenticated session persistence.

//

// In order to restore authentication state across HTTP requests, Passport needs

// to serialize users into and deserialize users out of the session.  In a

// production-quality application, this would typically be as simple as

// supplying the user ID when serializing, and querying the user record by ID

// from the database when deserializing.  However, due to the fact that this

// example does not have a database, the complete Twitter profile is serialized

// and deserialized.

passport.serializeUser(function (user, cb) {

  cb(null, user);

});



passport.deserializeUser(function (obj, cb) {

  cb(null, obj);

});





// Define routes.

app = express();


// Use application-level middleware for common functionality, including

// logging, parsing, and session handling.

app.use(require('morgan')('combined'));

app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({ extended: true }));

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));



// Initialize Passport and restore authentication state, if any, from the

// session.

app.use(passport.initialize());

app.use(passport.session());
app.get('/', function (req, res) {
  // console.log("home send");
  res.render('home', { user: req.user });

});



app.get('/login',

  function (req, res) {

    console.log('ENV');

    console.log(process.env);

    console.log('Headers:');

    console.log("!req.headers!" + req.headers);

    res.render('login');

  });

app.get('/login/github',

  passport.authenticate('github')
);

app.get('/oauth/github/callback',

  passport.authenticate('github', { failureRedirect: '/login' }), function (req, res) {

    Person.findOne({ ip: req.ip , id: req.user.id }, function (err, docs) {
      if (err) errorhandler(err);
      if (docs) {

        docs.signout = true;
        docs.save(function (err) {
          if (err) return handleError(err);
        });
      } else {

        const kitty = new Person({ signout: true, ip: req.ip, social: 'github', name: req.user.displayName, url:  req.user.photos[0].value, id: req.user.id });
        kitty.save().then(() => console.log('new Person save' + docs));


      }


    });
    res.redirect('/');
  });


app.get('/profile',

  require('connect-ensure-login').ensureLoggedIn(),

  function (req, res) {

    console.log("profile send");
    res.render('profile', { user: req.user });

  });









module.exports = app;

