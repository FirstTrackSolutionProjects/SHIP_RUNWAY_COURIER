import { Link } from 'react-router-dom';
import logo from '/logo 1.png'; // Adjust the path as needed

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-300 font-bold text-black p-8">
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap">
          {/* Company Info */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            {/* Optional Logo */}
            <div className="mb-4">
              <img src={logo} alt="Ship Runway Logo" className="w-28 h-auto" />
            </div>
            <h2 className="text-xl font-serif mb-2 hover:underline font-extrabold">
               <span className="text-blue-700"> Ship</span>
              <span className="text-orange-600"> Runway</span> Courier
            </h2>
            <p className="pr-4 font-normal">
              Delivering excellence in logistics solutions entire PAN India.
              <br /> Your reliable partner for domestic shipping services.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 hover:underline">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" onClick={scrollToTop} className="hover:underline">FAQs</Link></li>
              <li><Link to="/about-us" onClick={scrollToTop} className="hover:underline">About Us</Link></li>
              <li><Link to="/contact-us" onClick={scrollToTop} className="hover:underline">Contact Us</Link></li>

              <li><Link to="/privacy" onClick={scrollToTop} className="hover:underline">Privacy & Policy</Link></li>
              <li><Link to="/terms" onClick={scrollToTop} className="hover:underline">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4 hover:underline">Contact Us</h3>
            <p className="mb-2 pr-4">
             Address: Office No. 110, Bharat Chambars, Baroda Street Back Side Masjid Bundar East, Mumbai- 400009
            </p>
            <p className="mt-3 mb-8 md:-mb-4">Email: info@shiprunway.com</p>
          </div>

          {/* Available services */}
          <div className="w-full md:w-1/4 mt-4">
            <h3 className="text-xl font-bold mb-4 hover:underline">Available Services</h3>
            <ul className="space-y-2">
              <li>E-Commerce Delivery</li>
              <li>Pickup & Drop</li>
              <li>Packaging</li>
              <li>Domestic Services</li>
            </ul>
          </div>
        </div>
     

        <div className="mt-8 text-center">
          <p>Copyright©2026, Developed by First Track Solution Technologies</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
