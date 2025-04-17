const express = require("express");
const router = express.Router();
// const User = require("../Models/usersModel");

router.get("/profile", async (req, res) => {
    const userToken = req.cookies?.uid; 

    if (!userToken) {
        return res.status(401).send("No cookie found");
    }

    const { getUser } = require("../services/auth");
    const userData = getUser(userToken); // should return { id: '...' } if valid

    if (!userData || !userData.id) {
        return res.status(401).send("Invalid token");
    }

    // Fetch full user from DB
    const user = await User.findById(userData.id).select("-password");

    if (!user) return res.status(404).send("User not found");

    res.json({
        message: "User profile loaded",
        user,
        rawToken: userToken, // optional
    });
});

module.exports = router;
