const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true
  // },
  // password:{
  //   type: String,
  //   required: true
  // }
});

 
userSchema.plugin(passportLocalMongoose); //plugin by default gives username and password so i dont have to define em under userSchema. Thats why its been commented.

//create model
const User = mongoose.model('User', userSchema) //When you call mongoose.model() on a schema, Mongoose compiles a model for you.
//first paramater: name of collection. it will automatically makes it plural and lower case (users). 2nd param: Model schema. User: model name

module.exports = User; 

