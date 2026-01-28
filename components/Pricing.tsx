import React, { useMemo } from "react";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

type Tier = {
  name: string;
  price: string;
  unit: string;
  features: string[];
  color: string;
  recommended?: boolean;
};

const Pricing: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);

  const scrollToReservar = () => {
    const element = document.getElementById("reservar");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const tiers: Tier[] = useMemo(
    () => [
      {
        name: tr.pricing.tiers.week.name,
        price: tr.pricing.tiers.week.price,
        unit: tr.pricing.tiers.week.unit,
        features: tr.pricing.tiers.week.features,
        color: "border-blue-200",
      },
      {
        name: tr.pricing.tiers.friday.name,
        price: tr.pricing.tiers.friday.price,
        unit: tr.pricing.tiers.friday.unit,
        features: tr.pricing.tiers.friday.features,
        color: "border-orange-400 scale-105 shadow-2xl relative",
        recommended: true,
      },
      {
        name: tr.pricing.tiers.weekendFull.name,
        price: tr.pricing.tiers.weekendFull.price,
        unit: tr.pricing.tiers.weekendFull.unit,
        features: tr.pricing.tiers.weekendFull.features,
        color: "border-purple-200",
      },
    ],
    [tr]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Quicksand']">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4 font-['Baloo_2']">
          {tr.pricing.title}
        </h2>
        <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 font-medium">{tr.pricing.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`bg-white rounded-[40px] p-8 border-2 ${tier.color} transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
          >
            {tier.recommended && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg z-20">
                {tr.pricing.badgeMostBooked}
              </span>
            )}

            <div className="relative z-10 h-full flex flex-col">
              <div>
                <h3 className="text-2xl font-black mb-2 text-gray-800 font-['Baloo_2']">
                  {tier.name}
                </h3>

                <div className="mb-6">
                  <span className="text-5xl font-black text-blue-600">{tier.price}</span>
                  <span className="text-gray-400 font-bold ml-1">{tier.unit}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600 font-semibold text-sm"
                    >
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">
                        ✔
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={scrollToReservar}
                className={`mt-auto block w-full text-center py-4 rounded-2xl font-black text-lg transition-all border-none cursor-pointer ${
                  tier.recommended
                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md transform hover:-translate-y-1"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                {tr.pricing.ctaReserve}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 sm:mt-16 bg-gray-50 p-5 sm:p-8 rounded-[30px] sm:rounded-[40px] border border-gray-100 max-w-4xl mx-auto">
        <h4 className="text-lg sm:text-xl font-black text-gray-800 mb-4 sm:mb-6 font-['Baloo_2'] uppercase tracking-wide">
          {tr.pricing.conditionsTitle}
        </h4>

        <ul className="space-y-3 sm:space-y-4 text-[13px] sm:text-sm leading-relaxed font-semibold text-gray-600">
          {tr.pricing.conditions.map((text: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px] flex-shrink-0">
                ✔
              </span>
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
