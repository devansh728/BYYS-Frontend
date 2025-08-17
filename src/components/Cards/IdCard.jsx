import React from "react";

export default function IdCard({ user }) {
  return (
    <div className="w-[650px] h-[350px] rounded-xl shadow-lg overflow-hidden border border-gray-300">
      {/* Top Section */}
      <div className="bg-orange-400 h-[120px] flex items-center px-6 relative">
        {/* Logo */}
        <div className="absolute left-6 top-6">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-red-600 flex items-center justify-center bg-white">
            <img
              src="../../../public/assests/logo.jpg"
              alt="Logo"
              className="object-contain w-[70px] h-[70px]"
            />
          </div>
          <p className="text-[12px] text-white font-bold mt-1">REG. NO. : 66/22</p>
        </div>

        {/* Title */}
        <div className="flex flex-col text-center w-full">
          <h1 className="text-white font-extrabold text-2xl tracking-wide">
            BHARATIYA YUVA <br />
            VIDYARTHI SANGATHAN (BYVS)
          </h1>
          <p className="text-sm italic text-white mt-1">
            “FOR YOU , WITH YOU , FROM YOU”
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white h-[230px] px-6 py-4 relative">
        {/* Membership ID Card Title */}
        <h2 className="text-center font-bold underline mb-4 text-lg">
          MEMBERSHIP ID CARD
        </h2>

        {/* Details */}
        <div className="grid grid-cols-2 gap-y-2 text-[15px] font-semibold text-blue-900">
          <p>Name : {user.fullName}</p>
          <p className="border-b border-gray-300 w-[250px]"></p>

          <p>Member ID : generateMemberId</p>
          <p className="border-b border-gray-300 w-[250px]"></p>

          <p>District : Bangalore</p>
          <p className="border-b border-gray-300 w-[250px]"></p>

          <p>State : {user.state}</p>
          <p className="border-b border-gray-300 w-[250px]"></p>

          <p>D.O.I. : hello</p>
          <p className="border-b border-gray-300 w-[250px]"></p>
        </div>

        {/* Photo placeholder */}
        <div className="absolute right-8 top-[95px] w-[100px] h-[120px] bg-orange-300 rounded-lg"></div>

        {/* Signature */}
        <div className="absolute bottom-4 right-12 text-center">
          <p className="italic text-black text-sm">[Signature]</p>
          <p className="text-sm font-bold">Founder & National President</p>
        </div>
      </div>
    </div>
  );
}