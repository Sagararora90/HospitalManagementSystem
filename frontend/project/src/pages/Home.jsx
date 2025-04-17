import {  Link } from "react-router-dom";
import { Users, Heart, Clipboard, Shield } from "lucide-react";
import HospitalImage from "../assets/collab.png";  // Replace with your own image paths
import PatientCareImage from"../assets/learn.png";
import AdminPanelImage from "../assets/leaderboard.png";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, []);
  return (
    <div className="py-8">

      {user && (
        <h1 className="text-5xl font-bold ml-20 mt-10  mb-4">
          Welcome{" "}
          <span className="bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            {user.name || "Health Professional"}!
          </span>
        </h1>
      )}

      {/* Hero Section */}
      <div className="min-w-screen min-h-[400px] flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Efficiently Manage Your Hospital Operations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover MedSphere, a comprehensive solution designed to streamline hospital management, enhance patient care, and optimize your workflow.
          </p>
          <div className="mt-12 text-center">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              {user ? "Access Dashboard" : "Get Started!"}
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Key Features of MedSphere
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Users className="h-8 w-8 text-green-600 dark:text-green-400" />}
            title="Patient Management"
            description="Efficiently manage patient records, appointments, and treatment history. Ensure seamless communication between doctors and patients."
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8 text-green-600 dark:text-green-400" />}
            title="Real-time Health Monitoring"
            description="Monitor patient vitals in real-time, alerting staff to any irregularities, improving patient care and response times."
          />
          <FeatureCard
            icon={<Clipboard className="h-8 w-8 text-green-600 dark:text-green-400" />}
            title="Medical Reports and Analytics"
            description="Access, manage, and analyze medical reports to enhance diagnostics, treatment planning, and healthcare delivery."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-green-600 dark:text-green-400" />}
            title="Data Security"
            description="MedSphere ensures top-notch security for sensitive medical data, compliant with industry standards and regulations."
          />
        </div>
      </div>

      {/* Image Sections */}
      <ImageSection
        image={HospitalImage}
        title="Streamlined Hospital Operations"
        text="MedSphere centralizes hospital operations by managing patient admissions, schedules, and medical records all in one secure system."
        reverse={false}
      />
      <ImageSection
        image={PatientCareImage}
        title="Enhanced Patient Care"
        text="Improve patient care through real-time monitoring, better communication, and quicker response times between medical teams."
        reverse={true}
      />
      <ImageSection
        image={AdminPanelImage}
        title="Efficient Admin Dashboard"
        text="Empower your hospital’s admin team with an intuitive dashboard for managing staff, resources, finances, and patient data."
        reverse={false}
      />

      {/* Call to Action */}
      <div className="text-center py-16 bg-gray-100 dark:bg-gray-800">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          Ready to transform your hospital's operations?
        </h3>
        <Link
          to="/signup"
          className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Join MedSphere Now
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white transition-transform duration-300 hover:-translate-y-3 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function ImageSection({ image, title, text, reverse }) {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <img src={image} alt={title} className="w-[85%] rounded-xl shadow-md" />
      </div>
      <div className="lg:w-1/2 px-4">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300">{text}</p>
      </div>
    </div>
  );
}
