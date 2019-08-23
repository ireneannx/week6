var express = require('express');
var router = express.Router();
var db = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



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

//Register a user 
router.post('/register', (req, res) => {

  //find user in db. either returns empty array or smth
  db.User.findOne({ "email": "req.body.email" }) //returns a promise
    .then((userdata) => {
      //if user already exists 
      if(userdata){
        res.json({email: "email already exists"})
      }else{ 
        //user doesnt exist. So create user.
        const newUser = new db.User({
          email: req.body.email,
          password: req.body.password
        })

        //encrypt with bcrypt

        bcrypt.genSalt(10, function(err,salt){
          bcrypt.hash(req.body.password
            , salt, (err,hash)=>{
              if(err) throw err
              else{
              //store hash in db
              newUser.password = hash;
              newUser.save((err,user)=>{
                //create a token. 1st param: token _userId set to user._id set in db earlier. 2nd param: secret key used to generate token, 3rd param is a callback
                if(err){
                  console.log("user isnt saved to db")
                };

                jwt.sign({_userId: user._id}, "hello", function (err, token){
                  if(err){
                    console.log("token isnt being generated")
                  }
                  res.json(token); //this is the token that got generated
                })
              })
            
            }
            })
        })
      }

    })

})

module.exports = router;

//notes
//JWT features a hearder,payload, and signature. The payload is the set of claims contained within the JWT that contains a series of key/value pairs. The payload can be read by anyone
