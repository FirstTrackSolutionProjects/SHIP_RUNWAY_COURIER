// import React from 'react';

// const Offer = () => {
//   return (
//     <div className="py-10 px-4 bg-white">
//       <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
//         What We Offer
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
//         {/* International Shipping */}
//         {/* <div className="text-center">
//           <div className="mb-4">
//             <img
//               src="/international shipping.jpg" // Replace with actual image path
//               alt="International Shipping"
//               className="w-full object-contain mx-auto"
//             />
//           </div> */}
//           {/* Uncomment to add text below image */}
// {/*           
//           <h3 className="text-xl font-semibold text-yellow-600 mb-2">International Shipping</h3>
//           <p className="text-gray-700">
//             Take your business across borders with ease. Our international logistics solutions are designed
//             to handle complex shipping requirements while ensuring timely and secure deliveries. From
//             managing customs regulations to providing real-time visibility, we make cross-border shipping
//             hassle-free and efficient.
//           </p>
         
//         </div> */}

//         {/* Domestic Shipping */}
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           <div className="mb-4 md:w-1/2">
//             <img
//               src="/domestic shipping.jpg"
//               alt="Domestic Shipping"
//               className="w-full object-contain mx-auto"
//             />
//           </div>

//         <div className="md:w-1/2 text-center md:text-left">
//           <h3 className="text-2xl font-bold text-brand-green mb-2">Domestic Shipping</h3>
//           <p className="text-gray-600">
//             We simplify domestic logistics with tailored delivery services that keep your business agile.
//             Whether you need fast last-mile delivery, reliable freight transport, or streamlined scheduling,
//             our domestic shipping solutions are built to maximize efficiency and reliability from start to finish.
//           </p>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Offer;

import React from "react";

const Offer = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-12 tracking-wide">
          What We Offer
        </h2>

        {/* Domestic Shipping */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="/domestic shipping.jpg"
              alt="Domestic Shipping"
              className="w-full h-[350px] object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2">
            <h3 className="text-3xl font-extrabold text-green-900 mb-4 tracking-wide">
              Domestic Shipping
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We simplify domestic logistics with tailored delivery services
              that keep your business agile. Whether you need fast last-mile
              delivery, reliable freight transport, or streamlined scheduling,
              our domestic shipping solutions are built to maximize efficiency
              and reliability from start to finish.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Offer;