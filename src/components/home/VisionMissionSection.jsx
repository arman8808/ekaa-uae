import React from "react";
import { Link, useNavigate } from "react-router-dom";

function VisionMissionSection() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left Column - Content */}
      <div
        className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center"
        style={{ backgroundColor: "#6E2D79" }}
      >
        <div className="max-w-lg mx-auto">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Why EKAA at HHME (Vision & Mission)
          </h2>

          {/* Two lines of text */}
          <div className="space-y-4 mb-8">
            <p className="text-lg sm:text-xl text-white">
              We aim to showcase the power of the subconscious mind through live
              demonstrations, expert panels, and global engagement
            </p>
            <p className="text-lg sm:text-xl text-white">
              Our mission is to inspire conscious living and promote integrative
              healing.
            </p>
          </div>

          {/* Button */}

          <button
            onClick={() => {
              const element = document.getElementById("signature_program");
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            // onClick={() => navigate("/practitioner")}
            className="px-8 py-3 rounded-md font-semibold text-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            style={{
              color: "#6E2D79",
              backgroundColor: "white",
            }}
          >
            Discover Our Programs
          </button>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="w-full lg:w-1/2">
        <img
          src="/hhme/WhatsApp Image 2025-10-07 at 22.33.47.jpeg" // Replace with your actual image path
          alt="EKAA at HHME"
          className="w-full h-full object-contain min-h-[400px]"
        />
      </div>
    </div>
  );
}

export default VisionMissionSection;
