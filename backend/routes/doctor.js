const express = require('express');
const Doctor = require("../Models/doctorModel");
const {
    handleDoctorSignUp,
    handleDoctorLogIn,
} = require("../controllers/doctor");

const router = express.Router();

// GET all doctors
router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: "No Doctors Found" });
        }
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({ error: "Server error while fetching doctors" });
    }
});

// Signup
router.post('/signup', handleDoctorSignUp);

// Login
router.post('/login', handleDoctorLogIn);

module.exports = router;
