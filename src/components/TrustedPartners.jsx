import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const partners = [
  { name: 'Delhivery', logo: '/partners/delhivery.jpeg' },
  { name: 'Gati', logo: '/partners/gati.png' },
  { name: 'BlueDart', logo: '/partners/bluedart.jpg' },
  { name: 'Razorpay', logo: '/partners/razorpay.png' },
  { name: 'Zoho', logo: '/partners/zoho.jpeg' },
  { name: 'DHL', logo: '/partners/dhl.png' },
  { name: 'Ecom Express', logo: '/partners/ecom-express.png' },
  { name: 'XpressBees', logo: '/partners/xpressbees.png' },
];

const TrustedPartners = () => {
  const settings = {
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      { breakpoint: 500, settings: { slidesToShow: 3 } },
      { breakpoint: 400, settings: { slidesToShow: 2 } },
      { breakpoint: 330, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-brand-gray py-10 px-4 border-t border-gray-100">
      <h2 className="text-center text-xl font-bold text-brand-green mb-6 uppercase tracking-wider">
        Our Trusted Partners
      </h2>

      <Slider {...settings}>
        {partners.map((partner, index) => (
          <div key={index} className="flex justify-center px-2">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-24 w-auto bg-white rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrustedPartners;
