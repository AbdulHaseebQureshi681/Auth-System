import express from "express"
import ensureAuthenticated from "../Middlewares/Auth.js"
const router = express.Router()

router.get("/",ensureAuthenticated, (req,res)=>{
    console.log("---Logged in User Details------", req.user)
    return res.status(200).json([{
        name: "abcd",
        price : 133
    },
   {
        name: "abdfcd",
        price : 13
    },
    

])
})


export default router