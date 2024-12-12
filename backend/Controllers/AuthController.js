import bcrypt from "bcrypt"
import Joi from "joi"
import User from "../Models/users.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export const login = async(req,res) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().trim()
    })

    const {error,value} = userSchema.validate(req.body)
    const errorMessage = "Auth failed email or password is wrong"

    if(error){
        return res.status(500).json({
            status: false,
            message: "Bad Request"
        })
    }

    try{
        const {email,password} = value
        const user = await User.findOne({email:email})
        console.log(user)

        if(!user){
            return res.status(403).json({
                status: false,
                message: errorMessage
            })
        }

        const isPassword = await bcrypt.compare(password,user.password)

        if(!isPassword){
            return res.status(403).json({
                status: false,
                message: errorMessage
            })
        }

        const jwtToken = jwt.sign(
            {name: user.name, email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({
            status: true,
            message: "login success",
            jwtToken,
            email,
            name: user.name,

        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Internal Server issue",
            error: err
        })
    }
}


export const signup = async(req,res) =>{
    const userSchema = Joi.object({
        name: Joi.string().trim().required().min(3).max(100),
        email: Joi.string().trim().required().email(),
        password: Joi.string().min(4).max(100).required()
    })

    const {error,value} = userSchema.validate(req.body)
    
    if(error){
        return res.status(400).json({
            status: false,
            message: "Bad Request",
            error
        })
    }

    try{
        const {email,password} = value
        const user = await User.findOne({email})

        if(user){
            return res.status(409).json({
                success: false,
                message: "User is already exist, you can login"
            })
        }

        const userModel = new User(value)
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save()

        res.status(200).json({
            status: true,
            message: "Sined Up complete",
            userModel
        })
    }catch(error){
        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
} 