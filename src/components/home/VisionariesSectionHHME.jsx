import React from "react";
import { motion } from "framer-motion";

const bottomSlideVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function VisionariesSectionHHME() {
  const visionaries = [
    {
      name: "Dr. Sarah Johnson",
      title: "Director of Operations",
      description: "Strategic leader overseeing EKAA's global expansion and ensuring operational excellence across all training programs and therapeutic services.",
      image: "/hhme/Dr. Sarah Johnson.png"
    },
    {
      name: "Dr. Michael Chen",
      title: "Head of Research",
      description: "Neuroscience expert driving EKAA's evidence-based approaches to subconscious mind therapy and integrative healing methodologies.",
     image: "/hhme/Dr. Sarah Johnson.png"
    },
    {
      name: "Priya Patel",
      title: "Clinical Director",
      description: "Holistic therapist with 15+ years experience bridging ancient wisdom with modern clinical practice across EKAA's centers.",
      image: "/hhme/Dr. Sarah Johnson.png"
    }
  ];

  return (
    <div className="bg-[#FAF9FC] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: "#6E2D79" }}>
          Meet Our Visionaries
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {visionaries.map((person, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-start items-start gap-3 sm:gap-4"
              variants={bottomSlideVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="w-full aspect-[16/12] overflow-hidden rounded-lg">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl sm:text-[22px] font-bold" style={{ color: "#6E2D79" }}>
                  {person.name}
                </h3>
                <p className="text-sm sm:text-base font-medium mt-1" style={{ color: "#6E2D79" }}>
                  {person.title}
                </p>
              </div>
              <p className="text-sm sm:text-base leading-relaxed mt-2" style={{ color: "#6E2D79" }}>
                {person.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VisionariesSectionHHME;