const Appointment = require("../Models/appointmentModel");

const handleAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    // Validate the required fields
    if (!patientId || !doctorId || !date || !time || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new appointment document
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      appointmentDate: date,
      appointmentTime: time,
      reason,
      status: "Scheduled", // Default status
    });

    // Save the appointment to the database
    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { handleAppointment };
