import React, { useState} from "react";
import { FaMapMarkedAlt, FaRupeeSign, FaTruck, FaSearchLocation, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaMapMarkedAlt className="text-brand-green text-4xl mb-4" />,
    title: "Nationwide Domestic Network",
    description: "Connecting every corner of India with fast and reliable delivery.",
    bg: "bg-white border border-gray-100",
  },
  {
    icon: <FaRupeeSign className="text-brand-green text-4xl mb-4" />,
    title: "Affordable & Transparent Pricing",
    description: "Lowest rates with no hidden charges.",
    bg: "bg-white border border-gray-100",
  },
  {
    icon: <FaTruck className="text-brand-green text-4xl mb-4" />,
    title: "Door-to-Door Pickup & Delivery",
    description: "Convenience and comfort right at your doorstep.",
    bg: "bg-white border border-gray-100",
  },
  {
    icon: <FaSearchLocation className="text-brand-green text-4xl mb-4" />,
    title: "Real-Time Tracking",
    description: "Track your parcel anytime with live status updates.",
    bg: "bg-white border border-gray-100",
  },
  {
    icon: <FaHeadset className="text-brand-green text-4xl mb-4" />,
    title: "Friendly Support Team",
    description: "Dedicated assistance whenever you need help.",
    bg: "bg-white border border-gray-100",
  },
];

const Choosus = () => {
  return (
    <div className="bg-brand-gray py-14 px-6">

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-14">
          Why Choose Shiprunway?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bg} rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

         {/* View More / View Less Button */}
        {/* <button
          onClick={() => setShowMore(!showMore)}
          className="mt-10 px-6 py-2 border border-red-700 text-red-700 rounded-lg hover:bg-red-700 hover:text-white transition"
        >
          {showMore ? "View Less" : "View More"}
        </button> */}
      </div>
    </div>
  );
};

export default Choosus;
