import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, Calendar, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ setTotalDoctor }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false); // For showing all doctors

  const navigate = useNavigate(); // initialize navigation hook

  useEffect(() => {
    axios
      .get("http://localhost:5002/doctor", { withCredentials: true })
      .then((res) => {
        setDoctors(res.data);
        setFilteredDoctors(res.data);
        setTotalDoctor?.(res.data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, [setTotalDoctor]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(query) ||
        doc.specialization.toLowerCase().includes(query)
    );
    setFilteredDoctors(filtered);
  };

  const handleShowMore = () => {
    setShowAll(!showAll); // Toggle between showing all and first 4
  };

  // Handler for "Book Appointment" button click.
  const handleBookAppointment = (doctorId) => {
    // Navigate to the /appointments page.
    // Optionally, you can pass doctorId as state or as a route parameter.
    navigate("/appointments", { state: { doctorId } });
  };

  if (loading) return <p className="text-center py-10">Loading doctors...</p>;

  // Show only the first 4 doctors or all if showAll is true
  const doctorsToShow = showAll ? filteredDoctors : filteredDoctors.slice(0, 4);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Meet Our Doctors
      </h2>

      {/* Right-Aligned Search Bar */}
      <div className="flex justify-end mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            placeholder="Search by name or specialization"
          />
          <div className="absolute right-3 top-2">
            <Search className="h-5 w-5 text-indigo-600 dark:text-white" />
          </div>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {doctorsToShow.length > 0 ? (
          doctorsToShow.map((doc) => (
            <div
              key={doc._id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 transition-transform hover:scale-105 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-col items-center">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${doc.name}`}
                  alt={doc.name}
                  className="w-20 h-20 rounded-full shadow-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Dr. {doc.name}
                </h3>
                <span className="mt-1 text-sm px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full">
                  {doc.specialization}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-500" />
                  <span>{doc.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-indigo-500" />
                  <span>{doc.phoneNo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  <span>Age: {doc.age}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-500" />
                  <span>Gender: {doc.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Experience: </span>
                  <span>{doc.experience || "N/A"} years</span>
                </div>
              </div>

              <button
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
                onClick={() => handleBookAppointment(doc._id)}
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p>No doctors found based on your search criteria.</p>
        )}
      </div>

      {/* Show More Button */}
      {filteredDoctors.length > 4 && !showAll && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
