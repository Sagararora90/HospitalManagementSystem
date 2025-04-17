import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, User, XCircle } from "lucide-react";

const Appointment = () => {
  const [user, setUser] = useState(null);
  const [isDoctor, setIsDoctor] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"));
    setUser(storedUser);
    if (storedUser?.role === "doctor") setIsDoctor(true);

    fetchAppointments(storedUser);
    if (!storedUser?.role || storedUser?.role === "patient") {
      fetchDoctors();
    }
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5002/doctor");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAppointments = async (storedUser) => {
    try {
      const queryParam = storedUser?.role === "doctor"
        ? `doctorId=${storedUser._id}`
        : `patientId=${storedUser._id}`;

      const response = await axios.get(
        `http://localhost:5002/appointments?${queryParam}`,
        { withCredentials: true }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);  // Check if time and date are available
    try {
      const patientId = user._id;
      const payload = {
        patientId,
        doctorId: formData.doctorId,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
      };

      await axios.post("http://localhost:5002/appointments", payload, {
        withCredentials: true,
      });

      alert("Appointment Scheduled");
      fetchAppointments(user);
      setShowForm(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Please try again.");
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:5002/appointments/${appointmentId}`,
        { status: "Cancelled" },
        { withCredentials: true }
      );
      alert("Appointment Cancelled");
      fetchAppointments(user);
    } catch (error) {
      console.error("Error cancelling:", error);
      alert("Failed to cancel");
    }
  };

  return (
    <div className="p-6 relative">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-600">
          {isDoctor ? "Appointments For You" : "Your Appointments"}
        </h2>

        {!isDoctor && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg"
          >
            Book New Appointment
          </button>
        )}
      </div>

      {/* Appointment List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg border dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-indigo-600">
              {isDoctor
                ? `Patient: ${appointment.patient?.name || appointment.patient}`
                : `Doctor: ${appointment.doctor.name}`}
            </h3>
            <p className="text-gray-700 mt-1">
              Date:{" "}
              {new Date(appointment.appointmentDate).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-700">Time: {appointment.appointmentTime}</p>
            <p className="text-gray-500">Reason: {appointment.reason}</p>
            <p className="text-sm text-gray-400">Status: {appointment.status}</p>

            {isDoctor && appointment.status !== "Cancelled" && (
              <button
                onClick={() => handleCancel(appointment._id)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
              >
                Cancel Appointment
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Appointment Booking Form */}
      {showForm && !isDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-xl text-gray-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-indigo-600 mb-6 text-center">
              Book Your Appointment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
              <input
                name="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
              />
              <select
                name="doctorId"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="date"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
              />
              <input
                type="time"
                name="time"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
              />
              <input
                name="reason"
                placeholder="Reason"
                required
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
              >
                Fix Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
