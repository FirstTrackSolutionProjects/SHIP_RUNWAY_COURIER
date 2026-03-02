import React from 'react';
import aboutImage from '/about-image.jpg'; // Update the path if necessary

const AboutUs = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Banner Image */}
        <img
          src={aboutImage}
          alt="About Us Banner"
          className="w-full max-h-[400px] object-cover rounded-lg mb-8"
        />

        {/* Main Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">About Us</h1>
          <p className="text-xl text-gray-600 font-medium">
            Delivering Excellence in Domestic Logistics
          </p>
        </div>

        {/* Company Overview Section */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm mb-10 ring-1 ring-gray-900/5">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong className="text-gray-900">Rameshwar Cargo India Pvt. Ltd.</strong>, founded in <strong className="text-gray-900">June 2023</strong>, is a fast-growing logistics company <span className="text-[#145A32] font-extrabold">Ship</span><span className="text-[#E49B0F] font-extrabold">Runway</span> Courier dedicated to providing
              seamless and efficient domestic delivery solutions across India. With a focus on innovation and customer satisfaction, we’ve
              become a trusted logistics aggregator that bridges businesses and customers through smart, reliable, and cost-effective services.
            </p>
        </div>

        {/* Mission and Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-100 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">Our Mission</h2>
            <p className="text-gray-800">
              To revolutionize domestic logistics by connecting businesses and customers through innovative technology and exceptional service. 
              We ensure efficiency, transparency, and reliability in every shipment.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-700 mb-2">Our Vision</h2>
            <p className="text-gray-800">
              To be the leading domestic logistics aggregator, empowering businesses and individuals with seamless, cost-effective, 
              and eco-friendly delivery solutions.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-[#145A32] text-white text-center p-8 rounded-lg mt-10">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg">
            We bring together a network of trusted logistics providers, cutting-edge tracking systems, 
            and unparalleled customer support to ensure your parcels are delivered on time, every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
