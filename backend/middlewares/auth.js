const {getUser }= require("../services/auth")

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.status(401).json({ message: "Unauthorized. No cookie found." });
    }

    const user = await getUser(userUid);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized. Invalid user." });
    }

    req.user = user;
    next();
}


async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
        restrictToLoggedinUserOnly,
        checkAuth,
}