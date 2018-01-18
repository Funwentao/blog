var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./server/routes/index');
var users = require('./server/routes/users');
var login = require('./server/routes/login');
var register = require('./server/routes/register');
var blog = require('./server/routes/blog');
var write = require('./server/routes/write');
var markdown = require('./server/routes/markdown');
var insertCollection = require('./server/routes/insertCollection');
var getCollections = require('./server/routes/getCollections');
var insertArticle = require('./server/routes/insertArticle');
var saveArticle = require('./server/routes/saveArticle');
var getUserInformation = require('./server/routes/getUserInformation');
var article = require('./server/routes/article');
var getArticle = require('./server/routes/getArticle');

var dbConnection = require('./server/db/connection');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/blog', blog);
app.use('/markdown', markdown);
app.use('/register',register);
app.use('/write',write);
app.use('/insertCollection',insertCollection);
app.use('/insertArticle',insertArticle);
app.use('/getCollections',getCollections);
app.use('/saveArticle',saveArticle);
app.use('/getUserInformation',getUserInformation);
app.use('/article',article);
app.use('/getArticle',getArticle);


dbConnection();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
