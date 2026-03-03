import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <div className="bg-white py-5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-green-900 tracking-wide">
            Privacy Policy
          </h1>
        
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-12 space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information to provide better services to our users.
              This includes personal information such as your name, email
              address, and phone number, as well as non-personal information
              like browser type and IP address.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1.1 Personal Information
            </h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
              <li>Contact Information: Name, email, phone number, mailing address.</li>
              <li>Account Information: Username, password and related data.</li>
              <li>Payment Information: Billing address and transaction history.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1.2 Non-Personal Information
            </h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
              <li>Usage Data: IP address, browser type, operating system, pages viewed.</li>
              <li>Cookies & Tracking: Used to improve experience and analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use your information to improve our services, communicate with
              you, and enhance your experience. Marketing communication is only
              sent with your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. Sharing Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell or share your personal data without consent,
              except where required by law or necessary to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. Security of Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement technical and organizational security measures to
              protect your data from unauthorized access or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, update, or delete your personal
              information. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Children's Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are not intended for children under 13. We do not
              knowingly collect personal data from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy periodically. Updates will be
              posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              8. Contact Us
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl border">
              <p className="text-gray-700"><strong>Email:</strong> info@shiprunway.com</p>
              <p className="text-gray-700 mt-2">
                <strong>Address:</strong><br />
                19, Nav Vyapar Bhavan, 45 PD Mello Road,<br />
                Next to ICICI Bank, Masjid East, Mumbai - 400009, Maharashtra
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;