var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
global. errorHandler = require('errorhandler');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twitterRouter = require('./routes/twitter');
var googleRouter = require('./routes/google');
var pollsRouter = require('./routes/polls');
var app = express();




const mongoose = require('mongoose');
let Schema= mongoose.Schema;
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true});
global.GraphsValuesSchema = new Schema({ name: String, graphValue: { type: Number, default: 0 }});
global.GraphsSchema = new Schema({ name: String, graphValue:[GraphsValuesSchema] , votedIpAndUser:[String], type: String, comment:String } );
global.Person = mongoose.model('VoteAPP', new Schema ({signout:Boolean,ip:String,social:String, name: String, url:String,id:Number, polls:[GraphsSchema] }, {timestamps: true}));
//https://stackoverflow.com/a/54588517/4664725




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',twitterRouter);
app.use('/',pollsRouter);
/*app.use('/',googleRouter);;*/
app.enable('trust proxy');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // console.log('approot'+req.ip);
  next(createError(404));
});


 //twitterRouter(app,'db');
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 // console.log('approot'+req.ip);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
