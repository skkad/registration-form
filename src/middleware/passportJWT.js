// store instances of method
const {ExtractJwt} = require('passport-jwt');
const passport = require('passport');
const User = require('../models/userModel');


// stores instances of strategys
const JwtStrategy = require('passport').Strategy;

const initPassport = (passport)=>{
    console.log('inside initPassport');
    passport.use('jwt',
        new JwtStrategy({
            secretKey : 'NewtonSchoolJanBatch2022',
            jwtFormRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        },(payload,next)=>{
            console.log('inside callback');
            User.findById(payload.id)
            .then((user)=>{
                console.log('inside next');
                next(null,user);
            })
            .catch((err)=>{
                next(err,false);
            })
        })
    )
}

module.exports = initPassport;