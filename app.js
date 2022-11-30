const express = require('express');
// const path = require('path');
const cookie = require('cookie-parser');
const passport = require('passport');
// const expressLayouts = require('express-ejs-layouts');



const app = express();
const { getLandingPage,getLogInPage, getRegisterPage, getDashboardPage, postLogInData, postRegisterData} = require('./src/controllers/useControllers')
// const views_path = path.join(__dirname ,'templates/views');
// const public_path = path.join(__dirname,'public');

// importing connectDB to connect to DB
require('./src/db/connectDB');

app.use(cookie());
app.use(express.urlencoded({extended:false}));




// Static files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));





// Setting templates
// app.use(expressLayouts);

app.set("view engine","ejs");
app.set("layouts",'views');
// app.set('layouts','./layouts/index');

app.get('/',getLandingPage);

app.get('/dashboard',passport.authenticate('jwt',{session:false}),getDashboardPage)

app.get('/login',getLogInPage)

app.get('/register',getRegisterPage)

app.post('/register',postRegisterData)
app.post('/login',postLogInData)

// import strategys 
const initPassport = require('./src/middleware/passportJWT');
initPassport(passport);

app.listen(3030,()=>{
    console.log('Server running at port 3030');
})