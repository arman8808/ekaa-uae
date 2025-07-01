import React from "react";
const ContactLocations = () => {
  const contacts = [
    {
      id: 1,
      name: "Essentia Wellbeing Center",
      location: "UAE",
      contacts: [
        { name: "Zankhana Mistry", phone: "+971 56 681 2701", email: "Zankhana@essentiawellbeing.com" }
      ]
    },
    {
      id: 2,
      name: "Prana Wellness Center",
      location: "UAE and India",
      contacts: [
        { name: "Nisha Menon", phone: "+971504170465", email: "nishasmet@gmail.com" },
        { name: "Praveen Raghavan", phone: "+971501130315", email: "Mrpraveen3@gmail.com" }
      ]
    },
    {
      id: 3,
      name: "The Inner Sciences Foundation",
      location: "UAE, Lebanon",
      contacts: [
        { name: "Dr. Bassam Saab", phone: "+971506412480", email: "bassam_saab@hotmail.com" }
      ]
    },
    {
      id: 4,
      name: "Healing Hands",
      location: "India and Dubai",
      contacts: [
        { name: "Neerja Handa", phone: "+91-9811157333, +971-585262600", email: "neerjahanda@yahoo.co.in" }
      ]
    },
    {
      id: 5,
      name: "Aries Clinic & AM Health Hub",
      location: "Dubai",
      contacts: [
        { name: "Dr. Niya Sohan Roy", phone: "+971501440753", email: "Nsr1g13@gmail.com" }
      ]
    },
    {
      id: 6,
      name: "Lyfe Simply",
      location: "UAE",
      contacts: [
        { name: "Jacky Vrendra", phone: "+971505250093", email: "justbejacky@gmail.com" }
      ]
    },
    {
      id: 7,
      name: "Mariya Vazharzka",
      location: "Dubai, UAE",
      contacts: [
        { name: "Mariya Vazharzka", phone: "+971 50 552 1720", email: "mariya_vazharska@yahoo.com" }
      ]
    },
    {
      id: 8,
      name: "Rita Antyppa",
      location: "Dubai, UAE",
      contacts: [
        { name: "Rita Antyppa", phone: "+971565491712", email: "rita.antipa@hotmail.com" }
      ]
    },
    {
      id: 9,
      name: "Swasthye Sankalp",
      location: "Abu Dhabi, UAE",
      contacts: [
        { name: "Dr. Swapnalei Dhabolkar", phone: "+971508682983", email: "drswapnalidabholkar@yahoo.com" }
      ]
    },
    {
      id: 10,
      name: "Happiness Solutions",
      location: "UAE and India",
      contacts: [
        { name: "Rajesh J Singh", phone: "+971 58 109 7786 (UAE), +91 98921 41400 (India)", email: "happiness.soulutions.llc@gmail.com" },
        { name: "Gurbani Kaur", phone: "+971 58 628 1291 (UAE), +91 91401 69115 (India)", email: "neghagurbani@gmail.com" }
      ]
    },
    {
      id: 11,
      name: "Mograa Awakenings",
      location: "Abu Dhabi, UAE",
      contacts: [
        { name: "Dr. Rupinder Sodhi", phone: "+971 558573267", email: "drsodhi@mograaawakkenings.com" },
        { name: "Mitali Akarte", phone: "+971 586891604", email: "mitali@mograaawakkenings.com" }
      ]
    }
  ];
  return (
   <div className="bg-white text-[#6E2D79] p-6 md:p-10 max-w-6xl mx-auto">
      {/* EKAA IN UAE Section */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-[#6E2D79] pb-2">
          EKAA IN UAE
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                {contact.name} ({contact.location})
              </h3>
              {contact.contacts.map((person, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-gray-700">{person.phone}</p>
                  <p className="text-gray-700 break-all">{person.email}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLocations;