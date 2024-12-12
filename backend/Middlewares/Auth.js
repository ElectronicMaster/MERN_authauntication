import jwt from "jsonwebtoken"

const ensureAuthenticated = (req,res,next) => {
    const auth = req.headers['authorization'];
    console.log(auth)
    if(!auth){
        return res.status(403).json({
            status: false,
            message: "Unauthorized JWT token is required"
        })
    }

    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded; // decoded contains payload and we can access decoded by req.user wherever the middleware is used
        next()
    }catch(err){
        return res.status(403).json({
            message: "Unauthorized JWT token wrong or expired"
        })
    }
}

export default ensureAuthenticated