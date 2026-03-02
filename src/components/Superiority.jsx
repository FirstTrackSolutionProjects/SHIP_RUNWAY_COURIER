import React from 'react';

const stats = [
  {
    number: '10K+',
    label: 'Trusted Clients',
  },
  {
    number: '20K+',
    label: 'Orders Delivered',
  },
  {
    number: '25+',
    label: 'Sellers',
  },
];

const Superiority = () => {
  return (
    <div className="bg-white py-10 px-4 text-center">
      <h2 className="text-3xl font-bold mb-8">
       <span className="text-green-800">Ship</span> <span className="text-yellow-600">Runway</span> Superiority
      </h2>
      <div className="flex flex-col items-center space-y-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-md bg-green-50 rounded-lg p-6 shadow-md border border-yellow-100"
          >
            <h3 className="text-3xl font-bold text-green-800">{item.number}</h3>
            <p className="text-gray-600 text-lg">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Superiority;
