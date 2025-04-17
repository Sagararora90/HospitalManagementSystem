const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Scheduled" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
