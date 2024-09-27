const express = require('express') //express imported
const app = express() //giving express powers to the constant app

app.get('/', function(req, res){
    res.send(('Home Page'))
})

// app.use(function(req, res, next){
//     console.log("middleware");
//     next();
// }) //middleware

app.get('/profile', function(req, res){
    res.send(('Profile Page'))
}) 

app.get('/error', function(req, res, next){
    return next(new Error("Something Went Wrong"));//console error message
}) 

//use npm i nodemon 
//nodemon script.js or npx nodemon script.js
//the code above will refresh server without us having to do it   manually

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('something broke') //frontend error message
}) //error handling

app.listen(3000) //calling function