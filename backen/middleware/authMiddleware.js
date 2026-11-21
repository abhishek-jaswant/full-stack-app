
const jwt=require("jsonwebtoken")
const authMiddleware = (req,res,next) => {

    try {
        const authHeader = req.headers.authorization
        console.log(authHeader)
    

    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer "))
        return res.status(401).json({ msg: "No token provided" })
    
        const token = authHeader?.split(" ")[1];
        
        console.log(token)


        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)

        req.user = decoded;
        console.log("user is--->",req.user)
        next()
        
    } catch (error) {

        return res.status(401).json({msg:"Invalid token"})
        
    }
    
}

module.exports = authMiddleware;