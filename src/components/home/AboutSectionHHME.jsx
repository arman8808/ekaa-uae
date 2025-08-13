import React from "react";

function AboutSectionHHME() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8" style={{ color: "#6E2D79" }}>
          Holistic Health Middle East 2025
        </h2>

        {/* Paragraph */}
        <p className="text-lg sm:text-xl leading-relaxed text-center max-w-4xl mx-auto mb-12" style={{ color: "#A35F93" }}>
          EKAA is honoured to be the Headline Sponsor of HHME 2025 – a unique international platform celebrating the convergence of science, metaphysics, and integrative wellness. Our participation underscores our mission to bridge traditional wisdom with modern science, and to lead the evolution of emotional and mental well-being globally.
        </p>

        {/* Three images in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {/* Image 1 */}
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img 
              src="/hhme/Image 1.png" 
              alt="Holistic Wellness" 
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>
          
          {/* Image 2 */}
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img 
                src="/hhme/Image 2.png" 
              alt="Mind-Body Connection" 
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>
          
          {/* Image 3 */}
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img 
                src="/hhme/Image 3.png" 
              alt="Integrative Healing" 
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="flex justify-center mt-6">
          <button
            className="px-8 py-3 border-2 rounded-md font-medium text-lg transition-all duration-300 hover:bg-[#f5f0f9] focus:outline-none"
            style={{
              color: "#6E2D79",
              borderColor: "#6E2D79",
              backgroundColor: "white"
            }}
          >
            Download PDF
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ color: "#6E2D79" }}
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutSectionHHME;