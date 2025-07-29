import userModel from "../Models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body
        const user = await userModel.findOne({email})
        if(user){
           return res.status(409).json({
                message: "User is already registered"
                , success : false
            })
        }
        const usermodel = new userModel({name,email, password});
        usermodel.password = await bcrypt.hash(password, 10)
        await usermodel.save();
      return  res.status(201).json({
            message: "Sign Up Success"
            , success : true
        })
    }
    catch(err){
      return  res.status(500).json({
            message: "Internal Server Error"
            , success : false
        })
    }

}


const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        let errorMessage = "Can't sign in. Email or Password is Wrong"
        if(!user){
          return   res.status(403).json({
                message: errorMessage
                , success : false
            })
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        
        if(!isPassEqual){
            return res.status(403).json({
                message: errorMessage
                , success : false
            })
        }

        
        const jwttoken = jwt.sign({email: user.email , _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )
        return  res.status(201).json({
            message: "Login Success"
            , success : true,
            jwttoken,
            email,
            name : user.name
        })
    }
    catch(err){
        console.error("Login error:", err); // This will print the real error in your terminal
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }

}

export {
    signup
    ,login
};