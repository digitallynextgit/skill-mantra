"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const MouSection = () => {
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); 
    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="w-full">
      {/* MOU Section */}
      {isVisible ? (
        <section className="bg-[url('/banner.webp')] p-6 md:p-10 flex flex-col  justify-center items-center space-y-6 ">
          {/* Left Content */}
          <div className="flex md:flex-row flex-col md:items-end  text-center space-y-4 max-w-7xl mx-auto">
            <div className="md:w-[60%] flex flex-col gap-6 md:text-left text-center">
              <div className="flex items-start">
                <Image
                  src="/bannerlogo.webp"
                  alt="C.V. Raman University Logo"
                  className="object-cover"
                  width={400}
                  height={100}
                />
              </div>
              <h2 className="text-[#00e0d3] text-3xl lg:text-4xl font-bold leading-tight">
                Empowering Education and Innovation:
              </h2>
              <p className="text-black text-lg lg:text-xl font-normal">
                Dr. C.V. Raman University collaborates with Skill Mantra to
                drive excellence and opportunities for a brighter future.
              </p>
            </div>
            <div className="flex justify-end items-end gap-4 mt-4 md:w-1/2 flex-1">
              <button className="bg-[#00e0d3] text-white font-bold px-10 py-4 rounded-md hover:bg-blue-90 transition duration-300">
                <Link href="/mou">
                KNOW MORE
                </Link>
              </button>
              <button className=" bg-blue-90 font-bold text-white px-10 py-4 rounded-md hover:bg-[#00e0d3] hover:text-white transition duration-300">
              <Link href="/certificate">
                VIEW CERTIFICATE
                </Link>
              </button>
            </div>
          </div>
        </section>
      ) : (
        // Collapsed section
        <section className="bg-[#00e0d3] p-4 text-center">
          <p className="text-white text-lg font-semibold">
          MOU signed between Dr. CV Raman University & SkillMantra
          </p>
          <button className="bg-blue-90 text-white font-bold px-10 py-4 rounded-md hover:bg-[#00e0d3] transition duration-300 mt-6">
                <Link href="/mou">
                KNOW MORE
                </Link>
              </button>
        </section>
      )}
    </div>
  );
};

export default MouSection;
