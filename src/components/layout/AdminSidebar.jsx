import React from "react";
import { Link, useLocation } from "react-router-dom";
import { adminUtils } from "../../utils/adminUtils";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const navigation = [
  {
    name: "Awaken Limitless Human Dashboard",
    path: "/admin/dashboard",
    icon: <FaTachometerAlt />,
  },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const handleLogout = () => {
    adminUtils.logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
    fixed md:static z-50 top-0 left-0 h-full w-64
    transform md:translate-x-0 bg-white border-r border-gray-200
    text-gray-800 transition-transform duration-300 ease-in-out
    shadow-lg
    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >
        {/* Close button on mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          {/* Branding */}
          <div className="px-6 py-5 text-3xl font-bold tracking-tight border-b border-[#6E2D79] select-none text-[#6E2D79]">
            Ekaa Admin
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-4 py-3 rounded-lg font-semibold text-sm
                    transition
                    ${
                      isActive
                        ? "bg-[#6E2D79] text-white shadow-md"
                        : "text-gray-600 hover:bg-[#6E2D79] hover:text-white"
                    }
                  `}
                >
                  <span
                    className={`mr-3 text-lg flex-shrink-0
                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }
                    `}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer/User */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-[#6E2D79] h-12 w-12" />
              <div className="flex flex-col">
                <p className="text-gray-800 font-semibold text-base">Admin User</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-[#6E2D79] text-sm hover:text-[#5C2166] transition"
                >
                  <FaSignOutAlt /> Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
