import React from "react";

function BottomLine() {
  return (
    <div className="relative w-full my-8">
      {/* Horizontal Line */}
      <div className="w-full h-[1px] bg-[#B879D3]"></div>

      {/* Left Circle */}
      <div className="w-2 h-2 bg-[#B879D3] rounded-full absolute top-1/2 -translate-y-1/2 left-0"></div>

      {/* Right Circle */}
      <div className="w-2 h-2 bg-[#B879D3] rounded-full absolute top-1/2 -translate-y-1/2 right-0"></div>
    </div>
  );
}

export default BottomLine;
