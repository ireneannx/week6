//anything to do with mongodb is here
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/day1', {useNewUrlParser: true});

//import User model
module.exports.User = require('./users')