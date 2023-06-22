const mongoose=require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    Username:{
        type: String,
        required: true,
        minLength: 1
    },
    Password:{
        type: String,
        required: true,
        minLength: 4
    }
})

const User=mongoose.model("Privateinfo",userSchema);
module.exports=User;