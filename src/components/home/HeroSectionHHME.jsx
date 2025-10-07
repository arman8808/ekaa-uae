import React from "react";

function HeroSectionHHME() {
  return (
    <div className="relative h-screen w-full">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/hhme/hhme.png')",
            backgroundColor: "rgba(193, 131, 178, 0.6)",
            backgroundBlendMode: "multiply"
          }}
        ></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo container */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="h-20 w-20 sm:h-28 sm:w-28 flex items-center justify-center">
            <img 
              src="/hhme/Event Image 1.png" 
              alt="EKAA Logo" 
              className="max-h-full max-w-full w-auto h-auto object-contain" 
            />
          </div>
          <div className="h-20 w-20 sm:h-28 sm:w-28 flex items-center justify-center">
            <img 
              src="/hhme/WhatsApp Image 2025-10-07 at 22.34.23.jpeg" 
              alt="HHME Logo" 
              className="max-h-full max-w-full w-auto h-auto object-contain" 
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          EKAA – Headline Partner at HHME 2025
        </h1>

        {/* Date and location */}
        <p className="text-xl sm:text-2xl text-white mb-8">
          October 9, 2025 | Grand Mercure, Dubai
        </p>

        {/* Bottom line (divider) */}
        <div className="w-24 h-1 bg-white mb-8"></div>

        {/* Button */}
        {/* <button 
          className="px-8 py-3 sm:px-10 sm:py-4 text-lg font-semibold text-white rounded-md transition-all hover:bg-[#8a3a96] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#6E2D79]"
          style={{ backgroundColor: "#6E2D79" }}
        >
          Explore Participation
        </button> */}
      </div>
    </div>
  );
}

export default HeroSectionHHME;