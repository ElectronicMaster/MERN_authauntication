import express from "express"
import dotenv from "dotenv"
import connectDB from "./Models/db.js"
import cors from "cors"
import AuthRouter from "./Routes/AuthRouter.js"
import productRouter from "./Routes/ProductRouter.js"

dotenv.config()
const PORT = process.env.PORT || 5000

connectDB()
const app = express()


app.use(cors())
app.use("/auth",AuthRouter)
app.use('/products',productRouter)


app.get("/",(req,res) => {
    res.send("Hello World")
})

app.listen(PORT,
    console.log("Server started :: " + PORT)
)