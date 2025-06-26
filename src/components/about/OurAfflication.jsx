import React from "react";
import { motion } from "framer-motion";

const OurAfflication = () => {
  const logos = [
    { img: "/about/Logo1.png", alt: "Affiliation 1" },
    { img: "/about/Logo2.png", alt: "Affiliation 2" },
    { img: "/about/Logo3.png", alt: "Affiliation 3" },
    { img: "/about/Logo4.png", alt: "Affiliation 4" },
    { img: "/about/logo5.png", alt: "Affiliation 5" },
    { img: "/about/Logo6.png", alt: "Affiliation 6" },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#6E2D79] text-center mb-8 md:mb-12">
          Our Affiliations
        </h2>

        {/* Desktop Layout (3 logos in a row with dividers) */}
        <div className="hidden lg:flex flex-wrap justify-center items-center gap-8">
          {logos.slice(0, 3).map((logo, index) => (
            <div key={index} className="flex items-center">
              <div className="w-[250px] h-[150px] flex items-center justify-center p-4">
                <img 
                  src={logo.img} 
                  alt={logo.alt} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {index < 2 && (
                <div className="h-[100px] w-[1px] bg-gray-300 mx-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Layout (2 logos per row) */}
        <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-6">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="w-full h-[120px] md:h-[150px] flex items-center justify-center p-4"
            >
              <img 
                src={logo.img} 
                alt={logo.alt} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Second Row for Desktop (remaining 3 logos) */}
        <div className="hidden lg:flex flex-wrap justify-center items-center gap-8 mt-8">
          {logos.slice(3).map((logo, index) => (
            <div key={index + 3} className="flex items-center">
              <div className="w-[250px] h-[150px] flex items-center justify-center p-4">
                <img 
                  src={logo.img} 
                  alt={logo.alt} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {index < 2 && (
                <div className="h-[100px] w-[1px] bg-gray-300 mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAfflication;
