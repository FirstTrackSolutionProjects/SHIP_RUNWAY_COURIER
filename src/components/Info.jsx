import React from "react";

function Info() {
  const data = [
    {
      count: "20K+",
      label: "Our Trusted Clients",
      bg: "from-[#145A32]/20 to-[#145A32]/5",
      text: "text-[#145A32]",
    },
    {
      count: "40K+",
      label: "Orders Successfully Delivered",
      bg: "from-[#E49B0F]/20 to-[#E49B0F]/5",
      text: "text-[#C97A00]",
    },
    {
      count: "35+",
      label: "Suppliers",
      bg: "from-[#145A32]/10 to-[#E49B0F]/10",
      text: "text-[#0E3F2D]",
    },
  ];

  return (
    <div
  className="min-h-screen flex flex-col items-center justify-center px-6 py-14 bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]"
>

      <h2 className="text-[#145A32] text-3xl md:text-4xl font-bold mb-14 text-center">
        ShipWale Superiority
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {data.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.bg} rounded-2xl shadow-lg py-10 px-6 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
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
