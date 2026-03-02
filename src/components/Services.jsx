import React from 'react';
import { FaChartLine, FaLaptopCode, FaShieldAlt, FaWarehouse } from 'react-icons/fa';

const services = [
  {
    icon: <FaChartLine className="text-green-700 text-4xl mx-auto mb-4" />,
    title: 'Supply Chain Optimization',
    description: 'Enhance efficiency across your supply chain with smart analytics and expert planning.',
  },
  {
    icon: <FaLaptopCode className="text-green-700 text-4xl mx-auto mb-4" />,
    title: 'Real-Time Tracking',
    description: 'Monitor shipments with GPS and IoT for complete visibility and faster deliveries.',
  },
  {
    icon: <FaShieldAlt className="text-green-700 text-4xl mx-auto mb-4" />,
    title: 'Customs & Compliance',
    description: 'Simplify global shipping with automated compliance checks and customs documentation.',
  },
  {
    icon: <FaWarehouse className="text-green-700 text-4xl mx-auto mb-4" />,
    title: 'Warehouse Solutions',
    description: 'Maximize space and streamline fulfillment with intelligent warehouse management.',
  },
];

const Services = () => {
  return (
    <div className="py-20 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {service.icon}
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
