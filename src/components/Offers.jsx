import React from "react";

function Offers() {
  const offersData = [

    {
      title: "Domestic Shipping",
      image: "/image/domestic.jpg",
      desc: "Enhance your local supply chain with faster and more reliable logistics solutions. From optimized scheduling to secure last-mile delivery, we handle freight with precision to support your business operations smoothly and consistently.",
    },
  ];

  return (
   <div className="bg-white px-4 py-12 md:py-16 lg:py-20 text-center text-brand-green">

      <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-14">
        What We Offer
      </h2>

      <img
          src="/image/offer1.jpg"
          alt="About Us"
          className="w-full max-w-3xl h-auto mx-auto mb-6 rounded-xl shadow-md"
        />


      <div className="grid lg:grid-cols-1 gap-12 max-w-6xl mx-auto">
        {offersData.map((offer, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-brand-gray transition-all duration-300 p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-[420px] h-auto rounded-lg shadow-md mb-6 transform hover:scale-105 transition duration-300"
            />
            <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
              {offer.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
              {offer.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
