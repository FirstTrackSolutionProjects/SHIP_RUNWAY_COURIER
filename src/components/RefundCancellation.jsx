import React from 'react';
const API_URL = import.meta.env.VITE_APP_API_URL

const RefundCancellation = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Refund & Cancellation Policy</h1>

        <p className="mb-4">
          Thank you for choosing our logistics services. This Refund & Cancellation Policy outlines the terms and conditions regarding cancellations and refunds for bookings made through our website.
        </p>

        <h2 className="text-2xl font-semibold mb-2">1. Order Cancellation</h2>
        <p className="mb-4">
          You may request cancellation of your shipment booking before the shipment is picked up. Once the shipment has been picked up or is in transit, cancellation may not be permitted.
        </p>

        <h2 className="text-2xl font-semibold mb-2">1.1 Cancellation Before Pickup</h2>
        <p className="mb-4">
          If you cancel your booking before the shipment pickup is scheduled, you may be eligible for a full refund after deducting any applicable processing charges.
        </p>

        <h2 className="text-2xl font-semibold mb-2">1.2 Cancellation After Pickup</h2>
        <p className="mb-4">
          Once the shipment has been picked up, cancellation requests may not be accepted. In exceptional cases, partial refunds may be considered at our discretion.
        </p>

        <h2 className="text-2xl font-semibold mb-2">2. Refund Policy</h2>
        <p className="mb-4">
          Refunds will be processed only if the cancellation request meets the eligibility criteria mentioned above. Approved refunds will be initiated to the original payment method.
        </p>

        <h2 className="text-2xl font-semibold mb-2">2.1 Refund Processing Time</h2>
        <p className="mb-4">
          Once approved, refunds are typically processed within 7-10 business days. The time taken for the refund to reflect in your account depends on your bank or payment provider.
        </p>

        <h2 className="text-2xl font-semibold mb-2">3. Non-Refundable Charges</h2>
        <p className="mb-4">
          Certain charges such as service fees, convenience fees, or special handling charges may be non-refundable.
        </p>

        <h2 className="text-2xl font-semibold mb-2">4. Failed Transactions</h2>
        <p className="mb-4">
          If your payment was deducted but the booking was not confirmed due to technical issues, the amount will be automatically refunded within 5-7 business days.
        </p>

        <h2 className="text-2xl font-semibold mb-2">5. Changes to This Policy</h2>
        <p className="mb-4">
          We reserve the right to modify this Refund & Cancellation Policy at any time. Changes will be posted on this page, and continued use of our services constitutes acceptance of the updated policy.
        </p>

        <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions regarding cancellations or refunds, please contact us:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Email:</strong> info@shiprunway.com</li>
          <li><strong>Address:</strong> 19, Nav Vyapar Bhavan, 45 PD Mello Road,<br/> Next to ICICI Bank, Masjid East, Mumbai-400009, Maharashtra</li>
        </ul>
      </div>
    </div>
  );
};

export default RefundCancellation;