const mongoose = require('mongoose');
require('dotenv').config();


const db = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        // console.log("DB connection established")
    }catch(err){
        console.log("DB Error", err);
    }
}

module.exports = db;