import React from "react";

function Info() {
  const data = [
    {
      count: "20K+",
      label: "Our Trusted Clients",
      bg: "bg-white",
      text: "text-brand-green",
    },
    {
      count: "40K+",
      label: "Orders Successfully Delivered",
      bg: "bg-white",
      text: "text-brand-orange-dark",
    },
    {
      count: "35+",
      label: "Suppliers",
      bg: "bg-white",
      text: "text-brand-green-dark",
    },
  ];

  return (
    <div
  className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-14 bg-brand-gray"
>

      <h2 className="text-brand-green text-3xl md:text-4xl font-bold mb-14 text-center">
        ShipRunway Superiority
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
        {data.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-3xl shadow-sm border border-gray-200 py-12 px-8 text-center hover:shadow-md hover:-translate-y-2 transition-all duration-500 ease-out`}
          >
            <div className={`text-4xl font-extrabold ${item.text}`}>
              {item.count}
            </div>
            <p className={`mt-2 text-lg font-medium opacity-80 ${item.text}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Info;
