import React from "react";

const TermsOfUse = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <div className="bg-white py-5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-green-900 tracking-wide">
            Terms & Conditions
          </h1>
        
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-12 space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to Ship Runway Courier
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using this website, you agree to be bound by these
              terms along with our Privacy Policy. These terms govern your
              relationship with our company regarding the use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing this website, you agree to comply with all applicable
              laws and regulations and accept responsibility for compliance
              with local laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Use License
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of materials
              for personal, non-commercial viewing only. Under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 leading-relaxed">
              <li>Modify or copy the materials.</li>
              <li>Use materials for commercial or public display.</li>
              <li>Attempt to reverse engineer any software.</li>
              <li>Remove copyright or proprietary notices.</li>
              <li>Transfer or mirror materials on another server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Materials on this website are provided "as is". We make no warranties,
              expressed or implied, including merchantability, fitness for a
              particular purpose, or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. Limitations
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are not liable for any damages including loss of data,
              profit, or business interruption resulting from use or inability
              to use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Accuracy of Materials
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Website materials may include technical or typographical errors.
              We do not guarantee accuracy or completeness and may update
              content at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Links
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are not responsible for content on external websites linked
              from our platform. Use of such websites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Modifications
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may revise these terms at any time. Continued use of the
              website means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              8. Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These terms are governed by applicable laws and you agree to
              submit to the jurisdiction of the appropriate courts.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;