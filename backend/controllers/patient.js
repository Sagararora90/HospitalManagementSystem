const bcrypt = require("bcrypt");
const Patient = require("../Models/patientModel");  // <-- Update path if different
const { setUser } = require("../services/auth");

const SALT_ROUNDS = 10;

// -------------------- PATIENT SIGNUP --------------------
async function handlePatientSignUp(req, res) {
    const {
        name,
        email,
        password,
        phoneNo,
        age,
        gender
    } = req.body;

    try {
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ error: "Email already in use" });
        }

        if (age < 1 || age > 120) {
            return res.status(400).json({ error: "Invalid age. Must be between 1 and 120." });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newPatient = await Patient.create({
            name,
            email,
            password: hashedPassword,
            phoneNo,
            age,
            gender,
        });

        return res.json({ message: "Signup successful", patient: newPatient });
    } catch (error) {
        return res.status(500).json({ error: "Signup failed", details: error.message });
    }
}

// -------------------- PATIENT LOGIN --------------------
async function handlePatientLogIn(req, res) {
    const { email, password } = req.body;

    try {
        const patient = await Patient.findOne({ email });

        if (!patient)
            return res.status(401).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid email or password" });

        const token = setUser(patient);
        res.cookie("uid", token, {
            httpOnly: true,
            secure: false, // Set to true with HTTPS in production
        });

        return res.json({ message: "Login success", user: patient });
    } catch (err) {
        return res.status(500).json({ message: "Login failed", error: err.message });
    }
}

module.exports = {
    handlePatientSignUp,
    handlePatientLogIn,
};
