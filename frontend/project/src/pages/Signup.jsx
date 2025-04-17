import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient"); // 'doctor' or 'patient'
  const [step, setStep] = useState(1); // To track form steps

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Doctor-specific
    phoneNo: "",
    specialization: "",
    age: "",
    experience: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const endpoint =
        role === "doctor"
          ? "http://localhost:5002/doctor/signup"
          : "http://localhost:5002/patient/signup";

      const payload = { ...formData };
      delete payload.confirmPassword;

      const res = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      alert(`Signup successful as ${role}!`);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.error || "Signup failed. Try again.");
    }
  };

  const goToNextStep = () => setStep(step + 1);
  const goToPreviousStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-md w-full space-y-6 shadow-2xl rounded-lg p-8 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create Your Account
        </h2>

        {/* Role Selection */}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setStep(1); // Reset step on role change
            }}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Step 1: Common Info */}
          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
                className="input-style"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
                className="input-style"
              />
               <input
                type="text"
                name="phoneNo"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="input-style"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                className="input-style"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
                className="input-style"
              />

              <button
                type="button"
                onClick={goToNextStep}
                className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                Next
              </button>
            </>
          )}

          {/* Step 2: Doctor Fields */}
          {step === 2 && role === "doctor" && (
            <>
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                required
                onChange={handleChange}
                className="input-style"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                onChange={handleChange}
                className="input-style"
              />
              <input
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                onChange={handleChange}
                className="input-style"
              />
              <select
                name="gender"
                required
                onChange={handleChange}
                className="input-style"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <button
                type="button"
                onClick={goToPreviousStep}
                className="w-full py-3 px-6 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition duration-300 ease-in-out"
              >
                Back
              </button>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out mt-2"
              >
                Submit
              </button>
            </>
          )}

          {/* Step 2: Patient Fields */}
          {step === 2 && role === "patient" && (
            <>
              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                onChange={handleChange}
                className="input-style"
              />
              <select
                name="gender"
                required
                onChange={handleChange}
                className="input-style"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <button
                type="button"
                onClick={goToPreviousStep}
                className="w-full py-3 px-6 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition duration-300 ease-in-out"
              >
                Back
              </button>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out mt-2"
              >
                Submit
              </button>
            </>
          )}

          {/* Already have account */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>

          {/* Terms */}
          <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </Link>.
          </div>
        </form>
      </div>
    </div>
  );
}
