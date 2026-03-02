import React from 'react';
import { FaThumbsUp, FaLock, FaClock, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaThumbsUp className="text-green-700 text-3xl" />,
    title: 'Trusted Reputation',
    description: 'Proven excellence backed by customer satisfaction.',
  },
  {
    icon: <FaLock className="text-yellow-600 text-3xl" />,
    title: 'Advanced Security',
    description: 'Protecting packages with state-of-the-art systems.',
  },
  {
    icon: <FaClock className="text-green-700 text-3xl" />,
    title: 'On-Time Commitment',
    description: 'Deliveries that arrive when they’re supposed to.',
  },
  {
    icon: <FaHeadset className="text-yellow-600 text-3xl" />,
    title: 'Live Assistance',
    description: 'Real-time help whenever you need it.',
  },
];

const ChooseUs = () => {
  return (
    <div className="bg-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10">Why Choose Us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-green-50 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;
