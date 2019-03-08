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
var errorHandler = require('errorhandler');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twitterRouter = require('./routes/twitter');
var googleRouter = require('./routes/google');
var app = express();




const mongoose = require('mongoose');
let Schema= mongoose.Schema;
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true});
var GraphsValuesSchema = new Schema({ name: String, graphValue:Number });
var GraphsSchema = new Schema({ name: String, graphValue:[GraphsValuesSchema] });
global.Person = mongoose.model('VoteAPP', {ip:String,social:String, name: String, url:String,id:Number, graphs:[GraphsSchema] });
//https://stackoverflow.com/a/54588517/4664725




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',twitterRouter);
/*app.use('/',googleRouter);;*/
app.enable('trust proxy');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('approot'+req.ip);
  next(createError(404));
});


 //twitterRouter(app,'db');
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('approot'+req.ip);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
