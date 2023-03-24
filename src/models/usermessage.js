const mongoose=require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 3
    },

    email:{
        type: String,
        required: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
    },

    PhoneNumber:{
        type: Number,
        required: true,
        min:1000000000
    },

    message:{
        type:String,
        required: true,
        minLength:3
    }
})

const User=mongoose.model("User",userSchema);
module.exports=User;
