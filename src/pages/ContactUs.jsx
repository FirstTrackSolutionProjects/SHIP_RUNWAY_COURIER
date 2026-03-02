import React from 'react';
import contactImage from '/contact-image.jpg';
import { FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8 ">
      {/* Top Image */}
      <div className="max-w-4xl mx-auto mb-8">
        <img
          src={contactImage}
          alt="Contact Us"
          className="w-full h-68 object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
        <p className="text-lg text-gray-600 mt-2">
          We're here to help! Feel free to reach out to us with any questions or concerns.
        </p>
      </div>

      {/* Form + Info */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#145A32]"
            />
             <div className="flex space-x-2">
               <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <span className="text-xl mr-2">🇮🇳</span>
                <span className="text-gray-800">+91</span>
              </div>
            
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-5/6 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#145A32]"
              />
            </div>
           
  
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#145A32]"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#145A32]"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#145A32] text-white py-3 rounded-md font-semibold hover:bg-[#0E3F2D] transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-[#145A32] text-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <p className="mb-3">
            <strong>Address:</strong> Office No. 110, Bharat Chambars, <br/>Baroda Street Back Side Masjid Bundar East, Mumbai- 400009
          </p>
          <p className="mb-3">
            <strong>Phone:</strong> +91 1234567890
          </p>
          <p className="mb-3">
            <strong>Email:</strong> info@shiprunway.com
          </p>
          <p className="mb-3">
            <strong>Working Hours:</strong> Mon-Fri: 9 AM - 6 PM
          </p>
        
         {/* Floating WhatsApp Button (Only for Contact Page) */}
          <a
            href="https://wa.me/911234567890?text=Hello%20I%20am%20interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-36 md:bottom-24 right-4 md:right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-[1001] transition-transform duration-300 hover:scale-110 flex items-center justify-center"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
                    
        </div>
      </div>
          
          </div>


  );
};

export default ContactUs;

