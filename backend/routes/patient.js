const express = require('express');
const {
        handlePatientSignUp,
        handlePatientLogIn,
} 
= require("../controllers/patient")

const router = express.Router();

router.post('/signup',handlePatientSignUp);
router.post('/login',handlePatientLogIn)

module.exports = router;