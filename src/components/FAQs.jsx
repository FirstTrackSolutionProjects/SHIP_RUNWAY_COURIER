import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: (
      <span className="text-lg font-semibold">
        What is{" "}
        <span className="text-green-800 font-bold">Ship</span>
        <span className="text-orange-600 font-bold"> Runway</span> COURIER?
      </span>
    ),
    answer: (
      <>
        <span className="text-green-800 font-bold">Ship</span>
        <span className="text-orange-600 font-bold"> Runway</span> Courier
        appears to be a delivery service that emphasizes speed and efficiency
        in delivering packages, often catering to e-commerce businesses and
        urgent shipments.
      </>
    ),
  },
  {
    question: "How do I contact you?",
    answer:
      "You can check our website for customer service phone number or email support. This is usually the fastest way to get assistance.",
  },
  {
    question: "Will I get full refund on cancellation of order?",
    answer: "Yes, the full amount will be refundable.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Our return policy allows you to return items within 30 days of purchase for a full refund.",
  },
  {
    question: "How do I track my order?",
    answer:
      'You can track your order by logging into your account and visiting the "Shipment Reports" section.',
  },
  {
    question: "Do you offer international shipping?",
    answer: "No, we currently do not offer international shipping.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-green-900 text-center mb-12 tracking-wide">
          Frequently Asked Questions
        </h2>

        {/* FAQ Container */}
        <div className="bg-white rounded-2xl shadow-xl p-10">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-none py-6"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180 text-green-700" : ""
                  }`}
                  size={26}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index
                    ? "max-h-40 mt-4"
                    : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;