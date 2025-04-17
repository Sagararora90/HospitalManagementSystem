const express = require("express");
const { handleAppointment } = require("../controllers/appointment");
const Appointment = require("../Models/appointmentModel")

const router = express.Router();

router.post("/",handleAppointment)
router.post("/", async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      reason,
      status: "Scheduled",
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// GET: Fetch Appointments
router.get("/", async (req, res) => {
  try {
    const { patientId, doctorId } = req.query;

    let query = {};
    if (patientId) query.patient = patientId;
    else if (doctorId) query.doctor = doctorId;

    const appointments = await Appointment.find(query)
      .populate("doctor", "name")
      .populate("patient", "name");

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found." });
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// PUT: Cancel Appointment
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;