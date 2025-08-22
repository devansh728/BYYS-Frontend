import React from "react";
 

 export default function IdCard({ user }) {
  return (
  <div className="w-full max-w-md aspect-[1.586/1] rounded-xl shadow-lg overflow-hidden border border-gray-200 bg-orange-100">
  {/* Top Section (Orange) */}
  <div className="bg-orange-200 h-1/3 flex items-center px-4 relative">
  {/* Logo */}
  <div className="absolute left-4 top-4 w-16 h-16 rounded-full overflow-hidden border-2 border-red-400 bg-white flex items-center justify-center">
  <img
  src="../../../public/assests/logo.jpg"
  alt="Logo"
  className="object-contain w-full h-full p-1"
  />
  </div>
  <p className="absolute left-4 bottom-2 text-[0.6rem] text-orange-800 font-bold">REG. NO. : 66/22</p>
 

  {/* Title */}
  <div className="flex-grow flex flex-col items-center text-center py-2">
  <h1 className="text-orange-800 font-extrabold text-sm sm:text-lg tracking-wide leading-tight">
  BHARATIYA YUVA <br />
  VIDYARTHI SANGATHAN (BYVS)
  </h1>
  <p className="text-[0.5rem] sm:text-xs italic text-orange-800 mt-0.5 leading-none">
  “FOR YOU , WITH YOU , FROM YOU”
  </p>
  </div>
  </div>
 

  {/* Bottom Section (White) */}
  <div className="bg-white h-2/3 px-4 py-2 relative flex flex-col justify-between">
  {/* Membership ID Card Title */}
  <h2 className="text-center font-bold underline text-sm sm:text-base text-orange-600 mb-1">
  MEMBERSHIP ID CARD
  </h2>
 

  {/* Details */}
  <div className="grid grid-cols-2 gap-y-0.5 text-[0.7rem] sm:text-sm font-semibold text-blue-800">
  <p className="text-left">Name</p>
  <p className="text-left">: {user.fullName}</p>
 

  <p className="text-left">Member ID</p>
  <p className="text-left">: generateMemberId</p>
 

  <p className="text-left">District</p>
  <p className="text-left">: Bangalore</p>
 

  <p className="text-left">State</p>
  <p className="text-left">: {user.state}</p>
 

  <p className="text-left">D.O.I.</p>
  <p className="text-left">: hello</p>
  </div>
 

  {/* Photo placeholder */}
  <div className="absolute right-4 top-1/4 transform -translate-y-1/2 w-20 h-24 sm:w-24 sm:h-28 bg-orange-200 rounded-md flex items-center justify-center text-orange-800 font-bold text-center">
  {user.photo ? (
  <img src={user.photo} alt="User" className="object-cover w-full h-full rounded-md" />
  ) : (
  "Photo"
  )}
  </div>
 

  {/* Signature */}
  <div className="absolute bottom-2 right-4 text-right">
  <p className="italic text-black text-xs">[Signature]</p>
  <p className="text-xs font-bold text-gray-800 leading-none">Founder & National President</p>
  </div>
  </div>
  </div>
  );
 }