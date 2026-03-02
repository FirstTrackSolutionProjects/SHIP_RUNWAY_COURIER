import React from 'react';

const AboutSection = () => {
  return (
    <div className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Mission */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm">Strategic Purpose</span>
            <h2 className="text-brand-green font-extrabold text-3xl lg:text-4xl mt-2 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To revolutionize logistics with innovative technology, offering scalable and intelligent delivery
              solutions tailored for global businesses. We aim to bridge the gap between complexity and efficiency.
            </p>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-green to-brand-orange rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img src="/about-1.jpg" alt="Tech Logistics" className="relative w-full rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-brand-green rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img src="/about-2.jpg" alt="Vision Warehouse" className="relative w-full rounded-2xl shadow-2xl" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm">Future Roadmap</span>
            <h2 className="text-brand-green font-extrabold text-3xl lg:text-4xl mt-2 mb-6">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To become the world’s most trusted and intelligent logistics network, powered by data-driven systems
              and seamless connectivity. We envision a future where logistics is autonomous and boundaryless.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm">Core Principles</span>
            <h2 className="text-brand-green font-extrabold text-3xl lg:text-4xl mt-2 mb-6">Our Values</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Innovation, integrity, and excellence are at the heart of everything we do. We strive to deliver value
              with every shipment and build long-term partnerships through transparency and commitment.
            </p>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-green to-brand-orange rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img src="/about-3.jpg" alt="Team Values" className="relative w-full rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
