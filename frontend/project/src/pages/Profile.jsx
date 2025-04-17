import { User, Mail, Book, Award, LogOut } from 'lucide-react'; // Added LogOut icon
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [role, setRole] = useState("");

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem("User"));
            const userRole = localStorage.getItem("Role");
            setUser(userData || {});
            setRole(userRole || "");
            console.log("Loaded user:", userData);

            axios.get("http://localhost:5002/profile")
                .then((res) => console.log(res.data));

        } catch (error) {
            if (error.response?.status === 401) {
                navigate("/login"); // Redirect to login if unauthorized
            }
        }
    }, []);

    // Handle Logout
    const handleLogout = () => {
        // Clear local storage and expire cookie
        localStorage.removeItem("User");
        localStorage.removeItem("Role");
        
        // Optionally, expire the cookie here (if you're using cookies for session management)
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        // Redirect to login page after logout
        alert("You have logged out successfully.");
        navigate("/login");
    };

    return (
        <div className="py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-3">
                                <User className="h-12 w-12 text-gray-600 dark:text-gray-300" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {user.name || "Loading..."}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                                    <Mail className="h-4 w-4 mr-1" />
                                    {user.email || "Email not available"}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    <strong>Phone:</strong> {user.phoneNo || "Phone not available"}
                                </p>
                            </div>
                        </div>

                        {/* Conditional Rendering for Doctor vs. Patient */}
                        {role === "doctor" ? (
                            <>
                                {/* Medical Expertise (For Doctor) */}
                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                        <Book className="h-5 w-5 mr-2" />
                                        Medical Expertise
                                    </h2>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {Array.isArray(user.specialization) ? (
                                            user.specialization.map((spec) => (
                                                <span
                                                    key={spec}
                                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                                >
                                                    {spec}
                                                </span>
                                            ))
                                        ) : (
                                            <span
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                            >
                                                {user.specialization || "No specialization available"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Achievements (For Doctor) */}
                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                        <Award className="h-5 w-5 mr-2" />
                                        Achievements
                                    </h2>
                                    <div className="mt-2 space-y-3">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">🏆</span>
                                            <span>Best Caregiver - March 2024</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">⭐</span>
                                            <span>100+ Patients Treated</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">💼</span>
                                            <span>10 Years of Experience in Cardiology</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : role === "patient" ? (
                            <>
                                {/* Patient-specific Details */}
                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                        <Book className="h-5 w-5 mr-2" />
                                        Medical History
                                    </h2>
                                    <div className="mt-2 space-y-3">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">📝</span>
                                            <span>Medical History: {user.medicalHistory || "No history available"}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">🏥</span>
                                            <span>Last Visit: {user.lastVisit || "No visit record"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Prescriptions (For Patient) */}
                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                        <Award className="h-5 w-5 mr-2" />
                                        Prescriptions
                                    </h2>
                                    <div className="mt-2 space-y-3">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">💊</span>
                                            <span>Prescription 1: {user.prescription1 || "No prescription available"}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">💊</span>
                                            <span>Prescription 2: {user.prescription2 || "No prescription available"}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}

                        {/* Logout Button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
