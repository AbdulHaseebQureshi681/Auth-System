import dotenv from "dotenv"
dotenv.config() // Load environment variables as early as possible

import express from "express"
import db from "./Models/db.js"
import userModel from "./Models/User.js"
import bodyParser from "body-parser"  
import cors from "cors"
import AuthRouter from "./Routes/AuthRouter.js"
import ProductRouter from "./Routes/ProductRouter.js"
const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/auth", AuthRouter)
app.use("/products", ProductRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
