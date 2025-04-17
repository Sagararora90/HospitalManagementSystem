const bcrypt = require("bcrypt");
const Doctor = require("../Models/doctorModel");
const { setUser } = require("../services/auth");

const SALT_ROUNDS = 10;

async function handleDoctorSignUp(req, res) {
    const {
        name,
        email,
        password,
        phoneNo,
        specialization,
        age,
        experience,
        gender,
    } = req.body;

    try {
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ error: "Email already in use" });
        }

        if (age < 21 || age > 100) {
            return res.status(400).json({ error: "Invalid age. Must be between 21 and 100." });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newDoctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            phoneNo,
            specialization,
            age,
            experience,
            gender,
        });

        return res.json({ message: "Signup successful", user: newDoctor }); // Changed to `user`
    } catch (error) {
        return res.status(500).json({ error: "Signup failed", details: error.message });
    }
}

async function handleDoctorLogIn(req, res) {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });

        if (!doctor) return res.status(401).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

        const token = setUser(doctor);
        res.cookie("uid", token, {
            httpOnly: true,
            secure: false,
        });

        return res.json({ message: "Login success", user: doctor }); // Changed to `user`
    } catch (err) {
        return res.status(500).json({ message: "Login failed", error: err.message });
    }
}

module.exports = {
    handleDoctorSignUp,
    handleDoctorLogIn,
};
