import jwt from "jsonwebtoken"


const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({
            message : "Unauthorized , JWT Token is required"
        })
    }
    try{
        const decoded = jwt.verify(auth , process.env.JWT_SECRET)
        req.user= decoded
        next();
    }
    catch(err){
        return res.status(403).json({
            message : "Unauthorized , JWT Token is wrong or expired"
        })
    }


}

export default ensureAuthenticated