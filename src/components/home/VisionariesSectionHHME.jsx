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
      image: "/hhme/Rajesh Singh.webp",
    },
    {
      name: "Jacky vrendra",
      image: "/hhme/Jacky vrendra.webp",
    },
    {
      name: "Praveen Raghavan",
      image: "/hhme/Praveen Raghavan.webp",
    },
    {
      name: "Dr. Rupinder Singh Sodhi",
      image: "/hhme/Dr. Rupinder Singh Sodhi.webp",
    },
    {
      name: "Dr Bassam Saab",
      image: "/hhme/Dr Bassam Saab.webp",
    },
    {
      name: "Dr. Niya Roy",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {visionaries.map((person, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex-1 overflow-hidden border border-gray-100"
              variants={bottomSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Image with gradient overlay on hover */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content Area */}
              <div className="p-5 sm:p-6 md:p-7 flex flex-col gap-4">
                <div>
                  <h3
                    className="text-center text-xl sm:text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: "#6E2D79" }}
                  >
                    {person.name}
                  </h3>
              
                </div>

             
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VisionariesSectionHHME;
