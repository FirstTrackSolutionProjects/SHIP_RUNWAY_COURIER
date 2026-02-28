import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const industryData = [
  {
    title: 'Office Essentials',
    description:
      'Streamlining your stationery supply chain with efficient, reliable logistics solutions tailored to your needs.',
    image: '/stationery.jpg',
  },
  {
    title: 'Consumer Electronics',
    description:
      'Specialized handling for sensitive electronics, ensuring safe and timely delivery.',
    image: '/electronics.jpg',
  },
  {
    title: 'Power & Electrical',
    description:
      'Trusted logistics for the electrical sector, with robust transportation and warehousing.',
    image: '/electrical.jpg',
  },
  {
    title: 'Cosmetics',
    description:
      'Efficient solutions tailored for cosmetics, ensuring seamless delivery and exceptional service.',
    image: '/cosmetics.jpg',
  },
  {
    title: 'Apparel & Textiles',
    description:
      'Seamless distribution for textiles and apparel, optimized for fast-moving supply chains.',
    image: '/textile.jpg',
  },
  {
    title: 'Healthcare & Pharma',
    description:
      'Secure, compliant logistics for pharmaceuticals, with temperature-sensitive delivery options.',
    image: '/pharmaceuticals.jpg',
  },
];

const IndustryExpertise = () => {
  return (
    <div className="py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold text-brand-green mb-8">
        Industry <span className="text-brand-orange">Expertise</span>
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {industryData.map((industry, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <p className="text-gray-700 text-base mb-3">{industry.description}</p>
                <h3 className="text-xl font-bold text-orange-500">{industry.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default IndustryExpertise;
