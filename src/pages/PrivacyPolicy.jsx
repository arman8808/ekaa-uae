import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialCarousel from "../components/home/Testimonials";

function PrivacyPolicy() {
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
            Privacy Policy
          </motion.h1>

          <motion.p
            className="text-[14px] sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#6E2D79]/90 max-w-3xl mb-10 w-full md:w-[796px] drop-shadow-md font-normal"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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

      {/* Privacy Policy Content */}
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
              <h2 className="text-2xl font-bold text-[#6E2D79]">EKAA UAE – Privacy Policy</h2>
              <p className="text-gray-600 mt-2">Last updated: 1 November 2025</p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Welcome to EKAA UAE ("we", "us", "our"). We respect your privacy and are committed to protecting the personal data you share with us. 
                This Privacy Policy informs you of how we collect, use, disclose and safeguard your personal information when you visit our website (ekaauae.com) and use our services.
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">1. What information we collect from those who register for a program</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Identity information: name, date of birth, gender.</li>
                  <li>Contact information: email address, phone number, postal address.</li>
                  <li>Transactional information: details of purchases, payments, refunds.</li>
                  <li>Technical information: IP address, browser type, device information, usage data.</li>
                  <li>Marketing and communications data: preferences for marketing.</li>
                  <li>Other information as specifically required for a program or provided by you voluntarily.</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">2. How we collect information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Directly from you when you register, fill forms, subscribe, purchase or contact us.</li>
                  <li>Automatically when you browse our website (cookies, server logs).</li>
                  <li>From third parties (where applicable), e.g., payment processors, service providers.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">3. Use of your information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>To provide our services and process transactions.</li>
                  <li>To manage your account and communicate with you.</li>
                  <li>To improve our website and offerings.</li>
                  <li>To send marketing or promotional materials (if you've opted in).</li>
                  <li>To comply with legal obligations.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">4. Sharing your information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may share your information with service providers, regulatory authorities, or other parties with your consent. 
                  We do not sell your personal data to third parties.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">5. Cookies and tracking</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar technologies to analyse usage, enhance functionality, and personalise your experience.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">6. Data security</h3>
                <p className="text-gray-700 leading-relaxed">
                  We adopt appropriate measures to guard your personal data against unauthorised access, loss, or misuse.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">7. Data retention</h3>
                <p className="text-gray-700 leading-relaxed">
                  We retain your data as long as necessary for the purposes described, or as required by law.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">8. Your rights</h3>
                <p className="text-gray-700 leading-relaxed">
                  You may request access, correction, deletion, or restriction of your data by contacting us at ____________________________.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">9. International transfers</h3>
                <p className="text-gray-700 leading-relaxed">
                  We ensure appropriate safeguards for international data transfers.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-xl font-semibold text-[#6E2D79] mb-4">10. Contact us</h3>
                <p className="text-gray-700 leading-relaxed">
                  Email: _____________________________<br />
                  Address: ___________________________
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

export default PrivacyPolicy;