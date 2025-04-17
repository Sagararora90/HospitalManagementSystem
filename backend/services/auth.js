const jwt = require("jsonwebtoken");
const secret = "skillswap@123"

function setUser(user) {
    const payload = { user };
    return jwt.sign(payload, secret, { expiresIn: '6h' }); // token valid for 1 hour
}

function getUser(token){
        if(!token) return null;
        try{
        return jwt.verify(token,secret )

        }catch(err){
              return null;
        }
}
module.exports = {
        setUser,
        getUser,
}