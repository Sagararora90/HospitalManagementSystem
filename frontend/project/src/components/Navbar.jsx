import { useState, useEffect } from "react";
import { Menu, X, Stethoscope } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("User");
      const role = localStorage.getItem("Role");
      setIsLoggedIn(!!user);
      setRole(role);
    };

    checkAuth(); // Initial check

    const interval = setInterval(checkAuth, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  const navItems =
    role === "doctor"
      ? [
          { name: "Dashboard", href: "/" },
          { name: "Appointments", href: "/appointments" },
          { name: "Patients", href: "/patients" },
          { name: "Profile", href: "/profile" },
        ]
      : role === "patient"
      ? [
          { name: "Home", href: "/" },
          { name: "Dashboard", href: "/dashboard" },
          { name: "Doctors", href: "/doctors" },
          { name: "Appointments", href: "/appointments" },
          { name: "Profile", href: "/profile" },
        ]
      : [
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Contact", href: "/contact" },
        ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Medisphere
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                    style={({ isActive }) => ({
                      textDecoration: "none", // Remove underline
                      color: isActive
                        ? "transparent" // Make text transparent for gradient
                        : "inherit", // Default text color
                      background: isActive
                        ? "linear-gradient(to right, #6a11cb, #2575fc)" // Apply gradient on active link
                        : "none", // No background gradient
                      WebkitBackgroundClip: isActive ? "text" : "none", // For Safari
                      backgroundClip: isActive ? "text" : "none", // For modern browsers
                    })}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {!isLoggedIn ? (
              <div className="hidden md:flex gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-sm rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
            <button></button>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium"
                style={({ isActive }) => ({
                  textDecoration: "none", // Remove underline
                  color: isActive
                    ? "transparent" // Make text transparent for gradient
                    : "inherit", // Default text color
                  background: isActive
                    ? "linear-gradient(to right, #6a11cb, #2575fc)" // Apply gradient on active link
                    : "none", // No background gradient
                  WebkitBackgroundClip: isActive ? "text" : "none", // For Safari
                  backgroundClip: isActive ? "text" : "none", // For modern browsers
                })}
              >
                {item.name}
              </NavLink>
            ))}
            {!isLoggedIn ? (
              <div className="mt-2 border-t dark:border-gray-700 pt-2">
                <NavLink
                  to="/login"
                  className="block w-full text-center text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="block w-full text-center mt-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 px-4 py-2 rounded-md font-medium"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-center text-white bg-red-500 hover:bg-red-600 px-4 py-2 mt-4 rounded-md font-medium"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
