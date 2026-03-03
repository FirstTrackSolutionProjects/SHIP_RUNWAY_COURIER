import React from "react";

const RefundCancellation = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <div className="bg-white py-5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-green-900 tracking-wide">
            Refund & Cancellation Policy
          </h1>
       
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-12 space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Order Cancellation
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You may request cancellation before shipment pickup. Once the
              shipment has been picked up or is in transit, cancellation may
              not be permitted.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1.1 Cancellation Before Pickup
            </h3>
            <p className="text-gray-600 leading-relaxed">
              If cancelled before pickup, you may be eligible for a full refund
              after deducting applicable processing charges.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1.2 Cancellation After Pickup
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Once the shipment is picked up, cancellation may not be accepted.
              Partial refunds may be considered only in exceptional cases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Refund Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Refunds are processed only if eligibility criteria are met.
              Approved refunds are credited to the original payment method.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.1 Refund Processing Time
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Refunds are typically processed within 7–10 business days after
              approval. Bank processing times may vary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. Non-Refundable Charges
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Service fees, convenience charges, and special handling fees may
              be non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. Failed Transactions
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If payment is deducted but booking fails due to technical issues,
              the amount will automatically be refunded within 5–7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify this policy at any time.
              Updates will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Contact Us
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl border">
              <p className="text-gray-700">
                <strong>Email:</strong> info@shiprunway.com
              </p>
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

export default RefundCancellation;