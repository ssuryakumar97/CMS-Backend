const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8  
    }
});

module.exports= mongoose.model('userDetails', userSchema); //Creating a collection