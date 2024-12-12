import express from "express"
import bcrypt from "bcrypt"
import Joi from "joi"
import User from "../Models/users.js"
import { login, signup } from "../Controllers/AuthController.js"
import jwt from "jsonwebtoken"

const router = express.Router()

router.use(express.json())

router.post("/login",login)
router.post("/signup",signup)

export default router