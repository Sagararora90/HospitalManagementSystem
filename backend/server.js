const express = require("express");
const { connectToMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const cors = require("cors");

const app = express();
const port = 5002;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Register routes
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const profileRoutes = require("./routes/profileRoutes");
const appointmentRoutes = require("./routes/appointment");

app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use(restrictToLoggedinUserOnly);
// app.use("/dashboard", dashboardRoutes); // Uncomment if needed
app.use("/appointments", appointmentRoutes);
app.use("/profile", profileRoutes);

// MongoDB connection
connectToMongoDB("mongodb://127.0.0.1:27017/hms")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Port listening
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
