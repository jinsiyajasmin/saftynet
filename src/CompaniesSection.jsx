import React from "react";

const companies = [
  { name: "Google", logo: "/fujitec.png" },
  { name: "Microsoft", logo: "/Deltron.png" },
  { name: "Amazon", logo: "/Construct_Lifts.png" },
  { name: "Netflix", logo: "/Adstone.png" },
  { name: "Apple", logo: "/onision.png" },
  { name: "Apple", logo: "/ICRIT.png" },
  { name: "Apple", logo: "/Stannah.png" },
  { name: "Apple", logo: "/Peerless.png" },
  { name: "Apple", logo: "/Mitsubishi.png" },
  { name: "Apple", logo: "/Low.png" },
  { name: "Apple", logo: "/Lift.png" },
  { name: "Apple", logo: "/Ardo_Lifts.png" },
];

export default function CompaniesSection() {
  return (
    <div className="py-20 bg-[#f9fafb]">
      <div className="max-w-[1200px] mx-auto text-center px-6">
        <h4 className="text-4xl font-semibold mb-2 font-inter">
          Trusted by Leading Companies
        </h4>
        <p className="text-gray-500 mb-12 max-w-[600px] mx-auto font-inter">
          SafetyNet is proud to be working with global leaders across industries
          to deliver trusted and reliable safety solutions.
        </p>

        {/* Scrolling logos */}
        <div className="overflow-hidden whitespace-nowrap relative h-[120px] flex items-center">
          <div
            className="inline-flex animate-scroll"
            style={{
              animation: "scroll 30s linear infinite"
            }}
          >
            {/* Duplicate logos for seamless loop */}
            {[...companies, ...companies].map((company, index) => (
              <img
                key={index}
                src={company.logo}
                alt={company.name}
                className="h-[60px] mx-6 grayscale transition-all duration-400 ease-in-out hover:grayscale-0 hover:scale-120 hover:-translate-y-1 block"
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}
