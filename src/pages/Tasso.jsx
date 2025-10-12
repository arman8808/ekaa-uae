import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import HeroSection from "../components/utils/HeroSection";
import Card from "../components/utils/TassoCard";
import { Clock, FileText, GraduationCap, Mail } from "lucide-react";
import VideoPlayer from "../components/decode/VideoPlayer";

function Tasso() {
const modulesData = [
  {
    id: 1,
    title: "Module 1: Decode Your Mind",
    description: "Level 1: Master foundational techniques for mind exploration and therapeutic structuring",
    duration: "5 days",
    videoSrc: "",
    thumbnailSrc: "/thumbnails/module2.jpg",
    learningPoints: [
      "Master basic hypnosis skills and techniques",
      "Conduct effective client intake and induction processes",
      "Develop proficiency in reliving and regression methods",
      "Practice personification techniques for deeper exploration",
      "Learn aura-exploration methodologies",
      "Understand how to build therapeutic bridges",
      "Create comprehensive macrostructure for sessions"
    ],
    resources: [
      { name: "Study Guide PDF", url: "/resources/module1-guide.pdf" },
      { name: "Reference Reading", url: "/resources/module1-refs.pdf" }
    ]
  },
  {
    id: 2,
    title: "Module 2: Decode Your Behaviour",
    description: "Level 2: Specialized methods for addressing different types of trauma and behavioral patterns",
    duration: "5 days",
    videoSrc: "",
    thumbnailSrc: "/thumbnails/module2.jpg",
    learningPoints: [
      "Master techniques for accident trauma release",
      "Develop skills to address childhood trauma patterns",
      "Understand and resolve emotional hangovers and postulates",
      "Practice effective inner child healing methods",
      "Learn specialized approaches for birth trauma resolution",
      "Acquire techniques to work with pre-natal trauma",
      "Integrate trauma release methods into clinical practice"
    ],
    resources: [
      { name: "Case Studies", url: "/resources/module2-cases.pdf" },
      { name: "Technique Cheat Sheet", url: "/resources/module2-cheatsheet.pdf" }
    ]
  },
  {
    id: 3,
    title: "Module 3: Decode Your Relationships",
    description: "Level 3: Working with life choices, interpersonal connections, and ancestral attachments",
    duration: "5 days",
    videoSrc: "",
    thumbnailSrc:"/thumbnails/module2.jpg",
    learningPoints: [
      "Explore and analyze personal life plans and choices",
      "Develop techniques to modify limiting life patterns",
      "Master methods for releasing attachments to living persons",
      "Learn ancestral attachment release protocols",
      "Understand karmic and transgenerational influences",
      "Apply detachment techniques in therapeutic settings",
      "Integrate life plan awareness into client sessions"
    ],
    resources: [
      { name: "Attachment Case Studies", url: "/resources/module3-cases.pdf" },
      { name: "Life Plan Workbook", url: "/resources/life-plan-workbook.pdf" }
    ]
  },
  {
    id: 4,
    title: "Module 4: Decode Your Blue Print - Part 1",
    description: "Level 4: Techniques for accessing and healing various types of past life experiences",
    duration: "5 days",
    videoSrc: "",
    thumbnailSrc: "/thumbnails/module2.jpg",
    learningPoints: [
      "Process traumatic lifetimes and emotional hangovers between incarnations",
      "Resolve painful death experiences from past lives",
      "Address confused and disoriented soul memories",
      "Heal unnoticed or suppressed past life trauma",
      "Work with overwhelming death experiences from previous lifetimes",
      "Explore positive soul memories and beneficial past lives",
      "Understand shy or hesitant soul manifestations across lifetimes"
    ],
    resources: [
      { name: "Past Life Case Studies", url: "/resources/module4-cases.pdf" },
      { name: "Past Life Assessment Tools", url: "/resources/past-life-tools.pdf" }
    ]
  },
  {
    id: 5,
    title: "Module 5: Decode Your Blue Print - Part 2",
    description: "Level 4: Advanced techniques for karmic resolution and spiritual guidance",
    duration: "5 days",
    videoSrc: "",
    thumbnailSrc: "/thumbnails/module2.jpg",
    learningPoints: [
      "Navigate complicated karmic lifetimes and soul contracts",
      "Facilitate Higher Self interventions during sessions",
      "Identify and resolve deep karmic patterns across lifetimes",
      "Conduct integrative sessions bridging past and present awareness",
      "Develop protocols for complex multi-lifetime cases",
      "Master techniques for karmic debt resolution",
      "Utilize Higher Self guidance for therapeutic breakthroughs"
    ],
    resources: [
      { name: "Karmic Patterns Guide", url: "/resources/karmic-guide.pdf" },
      { name: "Higher Self Meditation Audio", url: "/resources/higher-self-meditation.mp3" }
    ]
  },
  {
    id: 6,
    title: "Module 6: Decode Your Blue Print - Part 3",
    description: "Level 4: Master techniques for complete healing integration and core transformation",
    duration: "5 days",
    videoSrc: "",
    thumbnailSrc: "/thumbnails/module2.jpg",
    learningPoints: [
      "Master techniques for Great Integrations across consciousness levels",
      "Conduct deep Core Issue Exploration and Transformation sessions",
      "Facilitate powerful Homing Sessions for soul realignment",
      "Develop protocols for multi-dimensional healing integration",
      "Identify and transform root core issues at their origin",
      "Create customized homing sequences for client needs",
      "Bridge spiritual insights with psychological transformation"
    ],
    resources: [
      { name: "Integration Handbook", url: "/resources/integration-guide.pdf" },
      { name: "Core Transformation Worksheets", url: "/resources/core-transformation.pdf" }
    ]
  }
];
  const courseInfo = {
    price: "AED 1,500",
    nextSession: "15th September 2024",
    enrollmentFeatures: [
      "Lifetime access to materials",
      "Personal mentor support",
      "Certificate upon completion",
      "Private community access",
    ],
    instructor: {
      name: "Dr. Jane Smith",
      qualification: "Ph.D. in Transpersonal Psychology",
      experience: "20+ years regression therapy experience",
      image: "/EK-2.jpg",
    },
  };
  const handleEnrollClick = () => {
    if (level === "1" || level === "3") {
      setIsModalOpen(true);
    } else {
      setComingSoonAlert(true);
      setTimeout(() => setComingSoonAlert(false), 3000); // Hide after 3 seconds
    }
  };
  return (
    <div>
      {" "}
      <Header />
      <HeroSection
        content={
          <div className="text-center">
            <h1 className="max-w-[90%] md:max-w-[1331px] text-white font-[Poppins] text-[30px] sm:text-[35px] md:text-[60px] lg:text-[65px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12">
              TASSO
            </h1>
          </div>
        }
        contentPosition="above"
      />
      {/* <Card /> */}
      <div className="w-full mx-auto px-4 sm:px-6 py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Modules List - 3/4 width */}
          <div className="lg:col-span-3 space-y-10">
            {modulesData.map((module, index) => (
              <div
                key={module.id}
                className="bg-white rounded-xl shadow-md border border-[#E5E7EB] overflow-hidden"
              >
                <div className="bg-[#F9FAFB] p-6 border-b border-[#E5E7EB] flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#6E2D79] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-[#6E2D79] text-xl sm:text-2xl font-semibold">
                      {module.title}
                    </h2>
                    <div className="flex items-center gap-2 text-[#6E2D79] mt-1">
                      <Clock size={16} />
                      <span className="text-sm">{module.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-6">
                  {/* Description */}
                  <p className="text-[#6E2D79] mb-6 text-base sm:text-lg">
                    {module.description}
                  </p>

                  {/* Video Section */}
                  <div className="mb-8 rounded-lg overflow-hidden">
                    <VideoPlayer
                      src={module.videoSrc}
                      thumbnailSrc={module.thumbnailSrc}
                      overlayText={`Module ${index + 1}`}
                      overlaySubtext={module.title}
                    />
                  </div>

                  {/* Learning Points */}
                  <div className="mb-8">
                    <h3 className="text-[#6E2D79] font-semibold text-lg sm:text-xl mb-4">
                      What You'll Learn:
                    </h3>
                    <ul className="space-y-3">
                      {module.learningPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-[#6E2D79] text-base">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  {/* {module.resources && module.resources.length > 0 && (
                    <div>
                      <h3 className="text-[#6E2D79] font-semibold text-lg sm:text-xl mb-4">
                        Resources:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {module.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                          >
                            <FileText className="text-[#6E2D79] flex-shrink-0" />
                            <span className="text-[#6E2D79] text-sm sm:text-base">
                              {resource.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar - 1/4 width */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enrollment Card */}
            <div
              className="rounded-xl p-6 text-white flex flex-col"
              style={{
                backgroundColor: "#6E2D79",
                minHeight: "400px",
              }}
            >
              <div className="mb-6">
                <div className="flex flex-col justify-center mb-2 text-lg sm:text-xl opacity-90">
                  Enroll in TASSO Program
                </div>
                <div className="font-bold mb-2 text-xl sm:text-2xl">
                  {courseInfo.price}
                </div>
                <div className="text-sm opacity-90 mt-4 sm:mt-6">
                  Next session starts: {courseInfo.nextSession}
                </div>
              </div>

              <ul className="list-disc text-sm sm:text-base space-y-2 pl-5 marker:text-white mb-6">
                {courseInfo.enrollmentFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <button
                onClick={handleEnrollClick}
                className="text-white font-semibold mt-auto hover:opacity-90 cursor-pointer w-full py-3 px-6"
                style={{
                  borderRadius: "30px",
                  background: "#C183B2",
                }}
              >
                Enroll Now
              </button>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
              <div className="flex flex-col">
                <h3 className="font-bold text-lg sm:text-xl text-[#6E2D79] mb-4">
                  Have Questions?
                </h3>
                <a
                  href="mailto:contact@ekaausa.com"
                  className="text-white inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#6E2D79] hover:bg-[#5a2465] transition-colors"
                >
                  <Mail size={18} />
                  Email Us
                </a>
              </div>
            </div>

            {/* EKAA Certified Faculty */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E5E7EB]">
              <img
                src={courseInfo.instructor.image}
                alt="Lead Instructor"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="text-[#6E2D79]" size={20} />
                  <h3 className="font-semibold text-lg text-[#6E2D79]">
                    EKAA Certified Faculty
                  </h3>
                </div>
                <p className="font-semibold text-[#6E2D79]">
                  {courseInfo.instructor.name}
                </p>
                <p className="text-sm text-[#6E2D79] mt-1">
                  {courseInfo.instructor.qualification}
                </p>
                <p className="text-sm text-[#6E2D79] mt-1">
                  {courseInfo.instructor.experience}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAQ />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Tasso;
