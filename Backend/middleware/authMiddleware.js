const jwt = require("jsonwebtoken")

function auth(role){

return (req,res,next)=>{

const token = req.headers.authorization

if(!token)
return res.status(401).json("Access denied")

const decoded = jwt.verify(
token.split(" ")[1],
process.env.JWT_SECRET
)

if(role && decoded.role !== role)
return res.status(403).json("Forbidden")

req.user = decoded

next()

}

}

module.exports = auth