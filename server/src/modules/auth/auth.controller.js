import { generateToken } from "../../lib/jwt.js";
import User from "../../models/user.model.js";
import bcrypt from "bcrypt"

export const signup = async (req,res) => {


    const { name, email, password } = req.body;

    try {

        if(!name || !email || !password){
            return res.status(400).json({message:'all field required'})
        }
        const user = await User.findOne({
            user_email: email
        });

        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            user_email: email,
            user_name: name,
            user_password: hashedPassword
        });

        generateToken(newUser._id, res);

        return res.status(201).json({ message: "signup successfull", user:{
            name:newUser.user_name,
            email:newUser.user_email,
            profilePic:newUser.user_profilePic,
            role:newUser.user_role
        }})

    } catch (error) {
        console.log("error in signup controller", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const login = async(req,res)=>{

    const {email,password} = req.body;

    try {
        const user = await User.findOne({
            user_email:email
        }).select("+user_password");

        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.user_password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        generateToken(user._id,res);

        return res.status(200).json({message:"login successfull",user:{
            name:user.user_name,
            email:user.user_email,
            profilePic:user.user_profilePic,
            role:user.user_role
        }})
        
    } catch (error) {
        console.log("error in login controller", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const checkAuth = async(req,res)=>{

    const user = req.user;

    try {
        res.status(200).json({user:{
            name:user.user_name,
            email:user.user_email,
            profilePic:user.user_profilePic,
            role:user.user_role
        }})
    } catch (error) {
        console.log("error while checking controller", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = (req, res) => {

    try {
        res.cookie("jwt", "", { maxAge: 0 })
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};