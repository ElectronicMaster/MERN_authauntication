import express from "express"
import ensureAuthenticated from "../Middlewares/Auth.js"

const router = express.Router()

router.use(express.json())

router.get("/",ensureAuthenticated,(req,res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },{
            name: "TV",
            price: 30000
        }
    ])
})

export default router