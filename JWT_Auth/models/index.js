const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/jwt", {useNewUrlParser: true},(err)=>{
  if(err) throw err;
  console.log("MongoDB is connected.....")
});

//import user model
module.exports.User = require('./users');
