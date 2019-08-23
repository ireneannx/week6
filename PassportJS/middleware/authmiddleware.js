//writing a middleware to create protected routes 
//create a function to check if user is logged in, if so export the function 

const loggedIn = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next();
  }else{
    res.json('not authenticated')
  }
}

module.exports = loggedIn