import React from "react";

function PartnersSectionHHME() {
  const logos = [
    "/hhme/Accreditation Image 4.png",
    "/hhme/Accreditation Image 3.png",
    "/hhme/Accreditation Image 2.png",
    "/hhme/Accreditation Image 1.png",

  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ color: "#6E2D79" }}
        >
          Global Reach & Accreditation
        </h2>

        {/* Logo Grid - First Row */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12">
          {logos.slice(0, 4).map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 sm:h-20"
            >
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>

    

        {/* Text Content */}
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-lg sm:text-xl leading-relaxed mb-6"
            style={{ color: "#A35F93" }}
          >
            EKAA is globally accredited and licensed in UAE, Netherlands, USA,
            and more, through partnerships with renowned institutions that
            validate our therapeutic approaches and training standards.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PartnersSectionHHME;
