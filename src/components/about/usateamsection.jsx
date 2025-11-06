import React from "react";
import BottomLine from "../utils/BottomLine";

function Usateamsection() {
  const contacts = [
    {
      id: 1,
      name: "Essentia Wellbeing Center",
      location: "UAE",
      contacts: [
        {
          name: "Zankhana Mistry",
          phone: "+971 56 681 2701",
          email: "Zankhana@essentiawellbeing.com",
        },
      ],
    },
    {
      id: 2,
      name: "Prana Wellness Center",
      location: "UAE and India",
      contacts: [
        {
          name: "Nisha Menon",
          phone: "+971504170465",
          email: "nishasmet@gmail.com",
        },
        {
          name: "Praveen Raghavan",
          phone: "+971501130315",
          email: "Mrpraveen3@gmail.com",
        },
      ],
    },
    {
      id: 3,
      name: "The Inner Sciences Foundation",
      location: "UAE, Lebanon",
      contacts: [
        {
          name: "Dr. Bassam Saab",
          phone: "+971506412480",
          email: "bassam_saab@hotmail.com",
        },
      ],
    },
    {
      id: 4,
      name: "Healing Hands",
      location: "India and Dubai",
      contacts: [
        {
          name: "Neerja Handa",
          phone: "+91-9811157333, +971-585262600",
          email: "neerjahanda@yahoo.co.in",
        },
      ],
    },
    {
      id: 5,
      name: "Aries Clinic & AM Health Hub",
      location: "Dubai",
      contacts: [
        {
          name: "Dr. Niya Sohan Roy",
          phone: "+971501440753",
          email: "Nsr1g13@gmail.com",
        },
      ],
    },
    {
      id: 6,
      name: "Lyfe Simply",
      location: "UAE",
      image: "/about/lyfe.jpeg",
      contacts: [
        {
          name: "Jacky Vrendra",
          phone: "+971505250093",
          email: "justbejacky@gmail.com",
        },
      ],
    },
    {
      id: 7,
      name: "Mariya Vazharzka",
      location: "Dubai, UAE",
      contacts: [
        {
          name: "Mariya Vazharzka",
          phone: "+971 50 552 1720",
          email: "mariya_vazharska@yahoo.com",
        },
      ],
    },
    {
      id: 8,
      name: "Rita Antyppa",
      location: "Dubai, UAE",
      contacts: [
        {
          name: "Rita Antyppa",
          phone: "+971565491712",
          email: "rita.antipa@hotmail.com",
        },
      ],
    },
    {
      id: 9,
      name: "Swasthye Sankalp",
      location: "Abu Dhabi, UAE",
      contacts: [
        {
          name: "Dr. Swapnalei Dhabolkar",
          phone: "+971508682983",
          email: "drswapnalidabholkar@yahoo.com",
        },
      ],
    },
    {
      id: 10,
      name: "Antarmann by Happiness Solutions",
      location: "UAE and India",
      contacts: [
        {
          name: "Rajesh J Singh",
          phone: "+971 58 109 7786 (UAE), +91 98921 41400 (India)",
          email: "happiness.soulutions.llc@gmail.com",
        },
        {
          name: "Gurbani Kaur",
          phone: "+971 58 628 1291 (UAE), +91 91401 69115 (India)",
          email: "neghagurbani@gmail.com",
        },
      ],
    },
    {
      id: 11,
      name: "Mograa Awakenings",
      location: "Abu Dhabi, UAE",
      image: "/about/mograa.jpeg",
      contacts: [
        {
          name: "Dr. Rupinder Sodhi",
          phone: "+971 558573267",
          email: "drsodhi@mograaawakkenings.com",
        },
        {
          name: "Mitali Akarte",
          phone: "+971 586891604",
          email: "mitali@mograaawakkenings.com",
        },
      ],
    },
  ];

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 pt-8 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {/* <h2 className="text-4xl font-bold text-[#A35F93] mb-3">Our Wellness Partners</h2> */}
        </div>

        <div className="space-y-8">
          {contacts.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#f0f0f0] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Organization Image - Enhanced with subtle animation */}
                <div className="md:w-2/5 p-6 flex justify-center items-center bg-[#faf9fc] hover:bg-[#f5f0f9] transition-colors duration-300">
                  <div className="bg-gradient-to-br from-[#f5eef9] to-[#e8def1] rounded-xl w-full h-64 flex items-center justify-center shadow-inner">
                    {org?.image ? (
                      <img
                        src={org?.image}
                        alt={"logo"}
                        className="w-40 h-40 object-contain rounded-full border-4 border-[#e0d4e9] transform hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center border-4 border-[#e0d4e9] transform hover:scale-105 transition-transform duration-300">
                        <span className="text-[#A35F93] text-5xl font-bold">
                          {org.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Organization Details - Improved spacing and hierarchy */}
                <div className="md:w-3/5 p-8">
                  <div className="mb-6 pb-4 border-b border-[#e8e0f0]">
                    <h1 className="text-3xl font-bold text-[#A35F93] mb-1">
                      {org.name}
                    </h1>
                    <div className="flex items-center text-[#A35F93] opacity-80">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="italic">{org.location}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-[#555] leading-relaxed">
                      {org.name} offers comprehensive wellness programs blending
                      ancient wisdom with modern science. Our certified
                      practitioners provide personalized care through
                      integrative approaches including meditation, yoga therapy,
                      and nutritional counseling to restore balance and
                      vitality.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {org.contacts.map((contact, index) => (
                      <React.Fragment key={index}>
                        <div className="flex items-start">
                          <div className="bg-[#f5f0f9] p-3 rounded-lg mr-4 flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-[#A35F93]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#777] mb-1">
                              {contact.name}
                            </p>
                            <a
                              href={`tel:${contact.phone.replace(
                                /[^0-9+]/g,
                                ""
                              )}`}
                              className="text-[#A35F93] font-semibold hover:underline block"
                            >
                              {contact.phone}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-[#f5f0f9] p-3 rounded-lg mr-4 flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-[#A35F93]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#777] mb-1">
                              {contact.name}
                            </p>
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-[#A35F93] font-semibold hover:underline block break-all"
                            >
                              {contact.email}
                            </a>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomLine />
    </div>
  );
}

export default Usateamsection;
