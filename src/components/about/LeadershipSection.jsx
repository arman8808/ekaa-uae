import React from "react";
import BottomLine from "../utils/BottomLine";

const LeadershipSection = () => {
  return (
    <section className="container mx-auto px-4 2xl:px-0">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-12">
        {/* Left: Text */}
        <div className="flex-1 text-[#5E3D8A] order-2 lg:order-1 space-y-6 px-4 md:px-0 2xl:max-w-3xl">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#6E2D79] font-poppins">
            Abhishek Kapadia
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#A35F93]">
            Abhishek Yuvraj Kapadia officially joined EKAA in January 2015 as
            the Strategic Business Head. With a fresh, dynamic approach, he has
            played a key role in expanding EKAA's presence to several new
            international locations—including Muscat, Kenya, Lebanon, and the
            United States—in addition to existing branches in Dubai and Hong
            Kong.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#A35F93]">
            He holds two degrees with distinction—Bachelor of Business and
            Bachelor of Science in Information Technology—from the University of
            Sydney (UTS). Abhishek divides his time between India and Sydney,
            Australia, balancing a career in holistic wellness with his passion
            for music as a guitarist and vocalist in his rock band "ADAPTORS."
            His previous work experience spans from 2005 to 2015 in strategic
            roles with companies like Focus Technologies and The Cancer Council
            in New South Wales.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#A35F93]">
            Through his leadership, EKAA has introduced new projects and
            streamlined operations, driven by his vision to make EKAA the go-to
            organization for alternative healing.
          </p>
        </div>
        {/* Right: Image */}
        <div className="order-1 lg:order-2 w-full max-w-[431px] shadow-lg">
          <img
            src="/about/abhiskhek.png"
            alt="Abhishek Kapadia"
            className="w-full h-auto md:h-[428px] object-cover rounded-2xl"
          />
        </div>
      </div>
      <BottomLine />

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mt-12">
        {/* Left: Image */}
        <div className="w-full max-w-[431px] shadow-lg">
          <img
            src="/about/priya.png"
            alt="Priya KP"
            className="w-full h-auto md:h-[428px] object-cover rounded-2xl"
          />
        </div>
        {/* Right: Text */}
        <div className="flex-1 text-[#5E3D8A] space-y-6 px-4 md:px-0 2xl:max-w-3xl">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#6E2D79] font-poppins">
            Priya KP
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#A35F93]">
            Priya K. P holds a Master’s in Microbiology from Bangalore
            University and an Advanced Diploma in Counselling and Psychology
            from Australia. She has played a pivotal role in transforming CHII
            into EKAA, a global leader in integrated clinical hypnotherapy.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#A35F93]">
            With certifications in Movement Therapy (CMTAI) and Transactional
            Analysis, her interests span early childhood development, youth
            wellbeing, and family systems. Priya brings vast experience from
            multinational corporates, combining strategic thinking with creative
            vision and strong governance.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#A35F93]">
            At EKAA, she supervises training content, certifies teachers and
            students, and drives innovation in workshops and programs. Her
            global outlook is enriched through regular participation in
            international seminars. She is passionate about reducing toxic
            stress in children, preventing emotional abuse, addressing the
            impact of COVID-19 on families and youth, and empowering women in
            business.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#A35F93]">
            Priya continues to shape EKAA's mission with empathy, vision, and
            excellence.
          </p>
        </div>
      </div>
      <BottomLine />
    </section>
  );
};

export default LeadershipSection;
