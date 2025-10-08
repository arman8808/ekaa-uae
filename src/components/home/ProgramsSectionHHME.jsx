import React from "react";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

function ProgramsSectionHHME() {
  const programs = [
    {
      title: "Awaken the limitless Human Level 1 to 5",
      description:
        "Comprehensive certification program covering all aspects of subconscious reprogramming and integrative healing.",
      // duration: "5 Days",
      price: "AED 3,500",
      image: "/hhme/Background.png",
    },
    {
      title: "TASSO Regression Therapy",
      description: `Advanced therapeutic
approach for accessing
and healing past
traumas stored in the
subconscious mind.`,
      // duration: "3 Days",
      price: "AED 2,500",
      image: "/hhme/Background (1).png",
    },
    {
      title: "Born Again - Inner Child Healing",
      description: `Transformative process
to reconnect with and
heal your inner child for
emotional freedom.`,
      // duration: "2 Days",
      price: "AED 1,800",
      image: "/hhme/Background (2).png",
    },
    {
      title: `Systemic
Constellations`,
      description: `Powerful method to
reveal and resolve
hidden family and
systemic dynamics
affecting your life.`,
      // duration: "2 Days",
      price: "AED 1,800",
      image: "/hhme/Background (3).png",
    },
//     {
//       title: `Decode`,
//       description: `Powerful method to
// reveal and resolve
// hidden family and
// systemic dynamics
// affecting your life.`,
//       // duration: "2 Days",
//       price: "AED 1,800",
//       image: "/hhme/Background (3).png",
//     },
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8" id="signature_program">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ color: "#6E2D79" }}
        >
          Signature Programs We Offer
        </h2>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Card */}
              <div className="bg-[#F9F7FE] h-full flex items-center gap-2 flex-col p-6 border border-[#E8E0F0]">
                {/* Title */}
                <img
                  src={program.image}
                  alt="backgroud"
                  className="h-[5rem] w-[5rem]"
                />
                <h3
                  className="text-[22px] font-normal mb-4 text-center"
                  style={{ color: "#6E2D79" }}
                >
                  {program.title}
                </h3>

                {/* Description */}
                <div className="space-y-3 mb-6">
                  {program.description.split("\n").map((line, i) => (
                    <p
                      key={i}
                      className="text-[#A35F93] text-center text-[15px] leading-8"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Duration and Price */}
                <div className="mt-auto pt-4 border-t border-[#E8E0F0] flex flex-col gap-2">
                  <div className="flex justify-between flex-col gap-2 items-center">
                    <span className="text-[#6E2D79] text-[15px] font-medium">
                      {program.duration}
                    </span>
                    <span className="text-[#6E2D79] text-[18px] font-bold">
                      {program.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgramsSectionHHME;
