import Joi from "joi"

const signupValidation = async (req, res, next) => {
    const schema = Joi.object({
        name : Joi.string().required().min(3).max(100),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4).max(100)
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message : "Bad Request", error })
    }
    next()
}

const loginValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4).max(100)
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message : "Bad Request", error })
    }
    next()
}

export {
    signupValidation,
    loginValidation
};