var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
let session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
global.errorHandler = require('errorhandler');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twitterRouter = require('./routes/twitter');
var googleRouter = require('./routes/google');
var pollsRouter = require('./routes/polls');
var githubRouter = require('./routes/GHlogin');
var fbRouter = require('./routes/FBlogin');
var app = express();
var passport = require('passport');
var MemoryStore = require('memorystore')(session);


global. mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });
global.GraphsValuesSchema = new Schema({ name: String, graphValue: { type: Number, default: 0 } });
global.GraphsSchema = new Schema({ name: String, graphValue: [GraphsValuesSchema], votedIpAndUser: [String], type: String, comment: String, test:{type:Boolean, default:false }});
global.Person = mongoose.model('VoteAPP', new Schema({ signout: Boolean, ip: String, social: String, name: String, url: String, id: Number, polls: [GraphsSchema] }, { timestamps: true }));
//https://stackoverflow.com/a/54588517/4664725




// view engine setup
//app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.enable('trust proxy');
app.use(require('morgan')('combined'));

app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.enable('trust proxy');
app.use(session({
  secret: 'cat',
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }), resave: true,
//secure secure:false only on localhost
  saveUninitialized: true, cookie: { maxAge: 60000, secure: false },

}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', twitterRouter);
app.use('/', pollsRouter);
app.use('/', fbRouter);
app.use('/', githubRouter);
/*app.use('/',googleRouter);;*/



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // console.log('approot'+req.ip);
  next(createError(404));
});


//twitterRouter(app,'db');
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log('approot'+req.ip);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
