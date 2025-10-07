import React from "react";
import { useNavigate } from "react-router-dom";

function MeetUsSectionHHME() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left Column - Image with colored background */}
      <div
        className="w-full lg:w-1/2 p-8 flex items-center justify-center"
        style={{ backgroundColor: "#C183B2" }}
      >
        <div className="max-w-md mx-auto">
          <img
            src="/hhme/Hero Imagehhme.png" // Replace with your actual image path
            alt="Venue Image"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Right Column - Content */}
      <div
        className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center"
        style={{ backgroundColor: "#6E2D79" }}
      >
        <div className="max-w-lg mx-auto text-white">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Where to Meet Us
          </h2>

          {/* Event Details */}
          <div className="space-y-4 mb-8">
            <p className="text-lg sm:text-xl">
              <span className="font-semibold">Date:</span> October 9, 2025
            </p>
            <p className="text-lg sm:text-xl">
              <span className="font-semibold">Time:</span> 9:00 AM - 6:00 PM
            </p>
            <p className="text-lg sm:text-xl">
              <span className="font-semibold">Venue:</span> Grand Mercure Dubai
              City
            </p>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl mb-10">
            Join us for a day of transformative experiences, live
            demonstrations, and expert panels at one of Dubai's premier venues.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/practitioner")}
            className="px-8 py-3 rounded-md font-semibold text-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white w-fit"
            style={{
              color: "#6E2D79",
              backgroundColor: "white",
            }}
          >
            Register Interest
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetUsSectionHHME;
