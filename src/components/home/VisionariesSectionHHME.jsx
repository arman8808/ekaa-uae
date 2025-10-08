import React from "react";
import { motion } from "framer-motion";

const bottomSlideVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function VisionariesSectionHHME() {
  const visionaries = [
    {
      name: "Rajesh Singh",
      title: "Founder & CEO - Happiness soulutions",
      image: "/hhme/Rajesh Singh.webp",
    },
    {
      name: "Jacky vrendra",
      title: "Founder - lyfe simply",
      image: "/hhme/Jacky vrendra.webp",
    },
    {
      name: "Praveen Raghavan",
      title: "Co-Founder - Prana Wellbeing Center",
      image: "/hhme/Praveen Raghavan.webp",
    },
    {
      name: "Dr. Rupinder Singh Sodhi",
      title: "Founder - Nograa Awakening",
      image: "/hhme/Dr. Rupinder Singh Sodhi.webp",
    },
    {
      name: "Dr Bassam Saab",
      title: "Certified Hyponotherapist and Holistic energy Healer - The Inner Science Foundation",
      image: "/hhme/Dr Bassam Saab.webp",
    },
    {
      name: "Dr. Niya Roy",
      title: "Co-Founder - Aries Clinic & Am Health Club",
      image: "/hhme/Dr. Niya Roy.webp",
    },
  ];

  return (
    <div className="bg-[#FAF9FC] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ color: "#6E2D79" }}
        >
          Meet Our Visionaries
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {visionaries.map((person, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#6E2D79]/20 flex flex-col h-full"
              variants={bottomSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {/* Enhanced Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#6E2D79]/5 to-[#8a3d97]/10">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/300"; // Fallback image
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Enhanced Content Area */}
              <div className="p-6 sm:p-7 md:p-8 flex flex-col gap-4 flex-1">
                {/* Name with decorative element */}
                <div className="text-center">
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-[#6E2D79] transition-colors duration-300"
                    style={{ color: "#6E2D79" }}
                  >
                    {person.name}
                  </h3>

                  {/* Decorative divider */}
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#6E2D79] to-transparent mx-auto mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Title with improved styling */}
                {person.title && (
                  <p className="text-center text-sm sm:text-base font-semibold text-gray-600 leading-tight mb-3 px-2">
                    {person.title}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VisionariesSectionHHME;
