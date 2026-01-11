import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    user_name:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    user_password:{
        type:String,
        required:true,
        select:false
    },
    user_role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    user_profilePic:{
        type:String,
        default:""
    },
    
},{timestamps:true});

const user = mongoose.model("User",userSchema);

export default user;