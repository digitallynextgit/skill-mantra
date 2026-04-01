"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import EligibilityForm from "./EligibilityForm"; // Assuming EligibilityForm is in the same directory

const InitialLoadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ">
      <div className="shadow-xl max-w-4xl w-full bg-transparent relative rounded-xl ">

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
          >
            <span className="text-3xl">×</span>
          </button>

          <div className="flex rounded-xl flex-col md:flex-row">
            {/* Left Section */}
            <div className="md:w-1/2 p-10 bg-[#CED4E8]">
              <h3 className="md:text-xl font-semibold text-center text-blue-90 mb-4 text-lg">
                A Joint Initiative by
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/ongc.webp"
                      alt="Corporate Partner"
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-md text-black p-4 rounded-xl bg-white ">
                      Corporate Partner
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-xl flex items-center justify-center">
                    <Image
                      src="/abbdv.webp"
                      alt="NGO Partner"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <p className="text-md text-black p-4 rounded-xl bg-white">
                      NGO Partner
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-xl flex items-center justify-center">
                    <Image
                      src="/favicon.webp"
                      alt="Knowledge Partner"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <p className="md:text-md text-black p-4 rounded-xl bg-white">
                      Knowledge Partner
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 p-6 bg-[#CED4E8] border-2 border-l-[white] ">
              <h2 className="md:text-2xl underline font-bold text-center mb-6 text-lg">
                Professional Certificate on Accountancy & Taxation
              </h2>
              <ul className="space-y-4 mb-8 font-bold">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 md:text-2xl">✓</span>
                  <span>Job Guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 md:text-2xl">✓</span>
                  <span>100% Scholarship</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 md:text-2xl">✓</span>
                  <span>3 Months on-campus Training</span>
                </li>
              </ul>

              <button
                onClick={() => setShowForm(true)}
                className="w-full md:text-xl text-md  bg-blue-90 rounded-full text-white py-3 px-4 hover:bg-blue-800 transition-colors text-center"
              >
                Check Your Eligibility
              </button>
            </div>
          </div>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-white z-10 text-xl"
                >
                  ×
                </button>
                <EligibilityForm />
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default InitialLoadPopup;
