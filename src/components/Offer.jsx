import React from 'react';

const Offer = () => {
  return (
    <div className="py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
        What We Offer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        {/* International Shipping */}
        {/* <div className="text-center">
          <div className="mb-4">
            <img
              src="/international shipping.jpg" // Replace with actual image path
              alt="International Shipping"
              className="w-full object-contain mx-auto"
            />
          </div> */}
          {/* Uncomment to add text below image */}
{/*           
          <h3 className="text-xl font-semibold text-yellow-600 mb-2">International Shipping</h3>
          <p className="text-gray-700">
            Take your business across borders with ease. Our international logistics solutions are designed
            to handle complex shipping requirements while ensuring timely and secure deliveries. From
            managing customs regulations to providing real-time visibility, we make cross-border shipping
            hassle-free and efficient.
          </p>
         
        </div> */}

        {/* Domestic Shipping */}
        <div className="text-center">
          <div className="mb-4">
            <img
              src="/domestic shipping.jpg" // Replace with actual image path
              alt="Domestic Shipping"
              className="w-full object-contain mx-auto"
            />
          </div>
          <h3 className="text-2xl font-bold text-brand-green mb-2">Domestic Shipping</h3>
          <p className="text-gray-600">
            We simplify domestic logistics with tailored delivery services that keep your business agile.
            Whether you need fast last-mile delivery, reliable freight transport, or streamlined scheduling,
            our domestic shipping solutions are built to maximize efficiency and reliability from start to finish.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offer;
