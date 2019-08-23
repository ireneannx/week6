var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//passport config
var passport = require('passport');
var LocalStrategy = require('passport-local');
const session = require('express-session');
// requires all the models. Accesing user can now be done with db.User.authenticate bla !!!!!!!!!!!
const db = require('./models');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(db.User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

//start session before you use passport
app.use(session({
  secret: "ast u",
  resave: false,
  saveUninitialized: false
}));



//routes------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//paths 
app.use('/', indexRouter);
app.use('/users', usersRouter);


//error--------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



//make sure routes are defined after configuring passport. because passport middleware and initialise mustbe defined before going on the routes. middle ware is used in login and register.js pages. if we route them first then it will go to that path without going through the middleware first 




module.exports = app;
