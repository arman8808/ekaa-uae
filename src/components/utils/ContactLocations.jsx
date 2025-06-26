import React from "react";
const ContactLocations = () => {
  return (
    <div className="bg-white text-[#6E2D79] p-6 md:p-10 max-w-6xl mx-auto">
      {/* EKAA IN UAE Section */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-[#6E2D79] pb-2">EKAA IN UAE</h2>
        
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Neerja Handa */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Neerja Handa (India and Dubai)</h3>
            <p className="text-gray-700">
              neerjahanda@yahoo.co.in<br />
              +91-9811157333<br />
              +971-585262600
            </p>
          </div>

          {/* Aries Clinic */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Aries Clinic & AM Health Hub, Dubai</h3>
            <p className="text-gray-700">
              Dr. Niya Sohan Roy<br />
              +971501440753<br />
              NsrIg13@gmail.com
            </p>
          </div>

          {/* Lyfe Simply UAE */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Lyfe Simply UAE</h3>
            <p className="text-gray-700">
              Jacky Vrendra<br />
              +971505250093<br />
              justbejacky@gmail.com
            </p>
          </div>

          {/* Mariya Vazharzka */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Mariya Vazharzka Dubai, UAE</h3>
            <p className="text-gray-700">
              +971 50 552 1720<br />
              mariya_vazharska@yahoo.com
            </p>
          </div>

          {/* Rita Antyppa */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Rita Antyppa Dubai, UAE</h3>
            <p className="text-gray-700">
              +971565491712<br />
              rita.antipa@hotmail.com
            </p>
          </div>
        </div>
      
      </div>

   
    </div>
  );
};

export default ContactLocations;