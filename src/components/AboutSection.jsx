import React from 'react';

const AboutSection = () => {
  return (
    <div className="bg-brand-gray py-16 px-4">
      {/* Mission */}
      <div className="flex flex-col md:flex-row items-center mb-12 gap-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-brand-green font-bold text-xl mb-2">Our Mission</h2>
          <p className="text-base">
            To revolutionize logistics with innovative technology, offering scalable and intelligent delivery
            solutions tailored for global businesses.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/about-1.jpg" alt="Tech Logistics" className="w-full rounded-md" />
        </div>
      </div>

      {/* Vision */}
      <div className="flex flex-col md:flex-row items-center mb-12 gap-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-green-600 font-bold text-xl mb-2">Our Vision</h2>
          <p className="text-base">
            To become the world’s most trusted and intelligent logistics network, powered by data-driven systems
            and seamless connectivity.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/about-2.jpg" alt="Vision Warehouse" className="w-full rounded-md" />
        </div>
      </div>

      {/* Values */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-green-600 font-bold text-xl mb-2">Our Values</h2>
          <p className="text-base">
            Innovation, integrity, and excellence are at the heart of everything we do. We strive to deliver value
            with every shipment and build long-term partnerships through transparency and commitment.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/about-3.jpg" alt="Team Values" className="w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
