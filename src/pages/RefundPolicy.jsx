import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialCarousel from "../components/home/Testimonials";

function RefundPolicy() {
  return (
    <div
      className="relative w-full flex flex-col overflow-x-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <motion.section
        className="relative mb-4 flex flex-col justify-center items-center text-center px-4 pt-[120px] md:pt-[160px] w-full h-[calc(800px-80px)] md:h-[700px] lg:h-[700px] bg-center bg-no-repeat  bg-cover "
        style={{
          backgroundImage: "url('/decode/Hero Image.svg')",
          height: "541px",
          flexShrink: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(244,234,253,0.8) 0%, transparent 20%)",
              "radial-gradient(circle at 70% 30%, rgba(32,178,170,0.5) 0%, transparent 25%)",
              "radial-gradient(circle at 30% 50%, rgba(244,234,253,0.8) 0%, transparent 20%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
          <motion.h1
            className="text-[26px] lg:text-[36px] sm:text-[32px] md:text-[36px] font-semibold mb-6 drop-shadow-lg text-[#6E2D79]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Refund & Cancellation Policy
          </motion.h1>

          <motion.p
            className="text-[14px] sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#6E2D79]/90 max-w-3xl mb-10 w-full md:w-[796px] drop-shadow-md font-normal"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Understand our refund and cancellation procedures for programs and services.
          </motion.p>

          <motion.div
            className="w-full h-px bg-[#6E2D79]/30 mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm mb-2 text-[#6E2D79] font-medium tracking-wider">
              SCROLL TO READ
            </p>

            <motion.div
              className="relative h-10 w-6 rounded-full border-2 border-[#6E2D79] flex justify-center p-1"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1 h-3 bg-[#6E2D79] rounded-full"
                animate={{
                  y: [0, 4, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Animated floating circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#6E2D79]/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.section>

      {/* Refund Policy Content */}
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-6 mb-6 flex items-center justify-between flex-col w-full">
              <h2 className="text-2xl font-bold text-[#6E2D79]">EKAA UAE – Refund & Cancellation Policy</h2>
              <p className="text-gray-600 mt-2">Last updated: 1 November 2025</p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                This Refund & Cancellation Policy applies to all purchases of services/products made through EKAA UAE (including via our website and other channels).
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">1. Cancellation by user</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>
                    You may cancel a service within 3 calendar days / 72 hours of purchase if no significant part of the service has been delivered.
                  </li>
                  <li>
                    Email us within the stipulated time limit on ________________________________ with purchase details for cancellation requests.
                  </li>
                  <li>
                    Refunds (if approved) will be processed within 30 days. Third-party costs (example: payment gateway charges) will be deducted from refunds.
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">2. Service commencement</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once a service has started (e.g., training or access given), refund eligibility may be limited and will be decided on a case-to-case basis based on merit.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">3. Non-refundable fees</h3>
                <p className="text-gray-700 leading-relaxed">
                  Registration or administrative fees will be non-refundable for programs already delivered or conducted. This is specially applicable for participants who registered but could not attend due to their personal circumstances. In exceptional cases such as hospitalisation or bereavement, a one-time exception may be made by EKAA but such exceptions if any shall not be a precedent for any future requests.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">4. Refund processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Approved refunds will be processed via the original payment method or bank transfer within 30 days.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">5. Changes by EKAA UAE</h3>
                <p className="text-gray-700 leading-relaxed">
                  If EKAA UAE cancels or changes a service, you may choose a full refund or transfer of the amount to be adjusted against another service by EKAA-UAE.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">6. Contact details</h3>
                <p className="text-gray-700 leading-relaxed">
                  Email: ____________________________<br />
                  Address: _________________________
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

export default RefundPolicy;