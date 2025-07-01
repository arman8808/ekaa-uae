import React from "react";

function Usateamsection() {
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 pt-4 pb-2">
      <div className="max-w-6xl mx-auto my-10 bg-white rounded-xl shadow-md overflow-hidden border border-[#f0f0f0]">
        <div className="flex flex-col md:flex-row">
          {/* Organization Image */}
          <div className="md:w-2/5 p-6 flex justify-center items-center bg-[#faf9fc]">
            <div className="bg-gradient-to-br from-[#f5eef9] to-[#e8def1] rounded-xl w-full h-64 flex items-center justify-center">
              <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center border-4 border-[#e0d4e9]">
                <span className="text-[#A35F93] text-4xl font-bold">M</span>
              </div>
            </div>
          </div>

          {/* Organization Details */}
          <div className="md:w-3/5 p-6">
            <div className="mb-4 pb-4 border-b border-[#e8e0f0]">
              <h1 className="text-3xl font-bold text-[#A35F93]">
                Mograa Awakenings
              </h1>
              <p className="text-[#A35F93] opacity-80 italic mt-1">
                By Dr. Rupinder Singh Sodhi and Mitali
              </p>
            </div>

            <div className="mb-6">
              <p className="text-[#555] leading-relaxed">
                Mograa Awakenings is a holistic wellness center integrating
                traditional healing with modern science. Founded in 2018, we
                specialize in personalized wellness journeys combining
                meditation, yoga, and nutrition. Our approach addresses
                mind-body harmony through Ayurvedic principles and contemporary
                research.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="bg-[#f5f0f9] p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#A35F93]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#777]">Website</p>
                  <a
                    href="https://mograa-awakenings.com"
                    className="text-[#A35F93] font-medium hover:underline"
                  >
                    mograa-awakenings.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-[#f5f0f9] p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#A35F93]"
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
                  <p className="text-sm text-[#777]">Email</p>
                  <p className="text-[#A35F93] font-medium">
                    contact@mograa.com
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-[#f5f0f9] p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#A35F93]"
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
                  <p className="text-sm text-[#777]">Phone</p>
                  <p className="text-[#A35F93] font-medium">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-[#f5f0f9] p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#A35F93]"
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
                </div>
                <div>
                  <p className="text-sm text-[#777]">Location</p>
                  <p className="text-[#A35F93] font-medium">
                    Serenity Valley, CA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Horizontal Line */}
      <div className="relative w-full my-8">
        {/* Horizontal Line */}
        <div className="w-full h-[1px] bg-[#B879D3]"></div>

        {/* Left Circle */}
        <div className="w-2 h-2 bg-[#B879D3] rounded-full absolute top-1/2 -translate-y-1/2 left-0"></div>

        {/* Right Circle */}
        <div className="w-2 h-2 bg-[#B879D3] rounded-full absolute top-1/2 -translate-y-1/2 right-0"></div>
      </div>

   
    </div>
  );
}

export default Usateamsection;
