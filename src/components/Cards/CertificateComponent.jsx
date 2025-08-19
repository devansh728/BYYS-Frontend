import React from "react";

export default function CertificateComponent({data}) {
  return (
    <div className="w-[900px] h-[600px] bg-orange-300 border border-gray-400 rounded-xl shadow-lg relative overflow-hidden p-10">
      {/* Logo + Reg. No */}
      <div className="absolute top-6 left-6 flex items-center">
        <div className="w-[80px] h-[80px] rounded-full bg-white border border-red-600 flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" className="w-[70px] h-[70px]" />
        </div>
      </div>
      <p className="absolute top-28 left-10 text-red-700 font-bold text-sm">
        Reg no: 66/22
      </p>

      {/* Title */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-extrabold text-black tracking-wide">
          BHARTIYA YUVA VIDYARTHI <br /> SANGATHAN (BYVS)
        </h1>
        <h2 className="text-2xl font-extrabold text-black mt-4 underline">
          CERTIFICATE OF HONOUR
        </h2>
        <p className="italic text-lg mt-2">THIS IS TO CERTIFY THAT</p>
      </div>

      {/* Body Content */}
      <div className="mt-12 text-lg leading-relaxed text-center">
         <div className="dynamic-line-container">
    <span className="dynamic-line-text">{data.fullName}</span>
        <p>
          _______________________________________________
        </p>
        <p className="mt-4">
         <div className="dynamic-line-container">
      <span className="dynamic-line-text">{data.position}</span>
          Is elected as _________________ of Bhartiya Yuva Vidyarthi Sangathan from
        </p>
        <p className="mt-2">
          <div className="dynamic-line-container">
      <span className="dynamic-line-text" style={{ left: '15%' }}>{data.block}</span>
      <span className="dynamic-line-text" style={{ right: '15%' }}>{data.district}</span>
          ___________________ Block of ___________________
        </p>
        <p className="mt-2">
          <div className="dynamic-line-container">
      <span className="dynamic-line-text" style={{ left: '40%' }}>{data.state}</span>
          District of ___________________ State .
        </p>
        <p className="mt-6 font-medium">
          This certificate is valid upto 1 year from the date of issue. <br />
          We wish you bright future.
        </p>
      </div>

      {/* Date + Signature */}
      <div className="absolute bottom-16 left-10 text-lg font-semibold">
        <p>Date Of Issue:</p>
        {data.date}
        <p className="mt-2">_</p>
      </div>

      <div className="absolute bottom-12 right-10 text-center">
        <p className="italic">[Signature]</p>
        <p className="font-bold">RAJA SAKSHAM SINGH YOGI</p>
        <p className="font-semibold">FOUNDER & NATIONAL PRESIDENT</p>
      </div>
    </div>
  );
}
