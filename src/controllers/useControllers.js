const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'NewtonSchoolJanBatch2022';
const createToken = async (user) =>{
    const userData = {
        id : user._id
    }
    const option = {
        expiers : '300s'
    }
    const token = await jwt.sign(userData,secretKey,option);
    return token;
}

const getLandingPage = (req,res)=>{
    res.render('./layouts/index');   
}

const getLogInPage = (req,res)=>{
    res.render('./partials/Login');
}

const getRegisterPage = (req,res)=>{
    res.render('./partials/Register');
}

const getDashboardPage = async (req,res)=>{
    console.log("inside dashboard Page");
    const {AuthToken} = req.cookies;
    jwt.verify(AuthToken,secretKey,async (err,decodedToken)=>{
        try{
            if(err){
                res.json({error:err})
            }else{
                const user = await User.findOne(decodedToken.id);
                // res.send(`<h3>Profile page --- UserName: ${user.name} --- Email: ${user.email} Age: ${user.age}</h3>`);
                res.render('./partials/Dashboard');
            }

        }catch(err){
            res.json({error:err})
        }
    })
    // res.render('./partials/Dashboard');
}

const postLogInData = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        console.log("Current user is ",user);

        const comparePassword = await bcrypt.compare(password,user.password);
        const token = await createToken(user);

        console.log("comparepassword ->",comparePassword);
        console.log("Token generated ",token);

        if(comparePassword){
            // res.send('<h3>Loged In successfully</h3>');
            
            res.cookie('AuthToken',token);
            console.log("Token established");
            res.render('./layouts/index');
            // res.redirect('http://localhost:3030/');
        }else{
            res.send('<h3>Password not correct</h3>');
        }

    }catch(e){
        res.json({error:e})
    }
}

const postRegisterData = async (req,res)=>{
    const {name,email,age,password} = req.body;

    const salt = bcrypt.genSaltSync(5);  // salting
    const securedPwd = bcrypt.hashSync(password,salt); 

    const newUser = new User({
        name,
        email,
        age,
        password: securedPwd
    })

    await newUser.save()
    .then((newUser)=>{
        console.log(newUser)
        const token =  createToken(newUser);
        res.cookie('AuthToken',token);
        res.render('./layouts/index');
        console.log("Token established");
        // res.redirect('http://localhost:3030/');
        // res.send("<h3>SignUp successful</h3>")
    })
    .catch((e)=>{
        res.status(400).send(`<h3>Error Occured : ${e.message}</h3>`)
    })
}

module.exports = {
    getLandingPage,
    getLogInPage,
    getRegisterPage,
    getDashboardPage,
    postLogInData,
    postRegisterData
}