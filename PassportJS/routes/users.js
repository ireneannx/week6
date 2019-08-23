var express = require('express');
var router = express.Router();
const db = require('../models');
const passport = require('passport')

//path -users/

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// GET login page 
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
})

// GET register page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
})

// register new user 
router.post('/register', (req, res, next) => {
  console.log('registering user...');
  //register automatically checks if the same username already exists. If so, returns error. new User is creating a new document in the User model
  db.User.register(new db.User({ username: req.body.username }), req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, function () {
        console.log('user registered!');
        res.redirect('/users/login')
      })
    })
    .catch((err) => {
      res.send(err)
    })
  // , function(err){
  //   if(err){
  //     console.log('error while user register!', err);
  //     return next(err);
  //   }
  //   console.log('user registered!');
  //   res.redirect('/users/login')
  // });
});

//login that user 
router.post('/login', passport.authenticate("local",{
  successRedirect : '/',
  failureRedirect: '/users/login'
}),(req,res)=>{})


module.exports = router;
