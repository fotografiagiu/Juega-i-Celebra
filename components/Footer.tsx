import React from "react";
import { t, type Lang } from "../src/i18n";

type Props = { lang: Lang };

const Footer: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);

  // ✅ BLINDAJE: si por lo que sea falta footer o alguna key, no rompe la web
  const f = tr.footer ?? {
    description:
      "Dedicados a crear experiencias mágicas para los más pequeños de la casa.",
    quickLinksTitle: "Enlaces",
    links: { inicio: "Inicio", servicios: "Servicios", tarifas: "Tarifas", contacto: "Contacto" },
    legalTitle: "Legal",
    legal: { legalNotice: "Aviso Legal", privacy: "Privacidad", cookies: "Cookies" },
    copyright: "© 2026 Juga i Celebra.",
    designed: "",
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                J
              </div>
              <span className="text-2xl font-extrabold text-blue-600">
                Juga <span className="text-orange-500">i</span> Celebra
              </span>
            </div>

            <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
              {f.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-6 uppercase tracking-wider text-sm">
              {f.quickLinksTitle}
            </h4>
            <ul className="space-y-3">
              <li><a href="#inicio" className="text-gray-500 hover:text-blue-600 transition-colors">{f.links?.inicio ?? "Inicio"}</a></li>
              <li><a href="#servicios" className="text-gray-500 hover:text-blue-600 transition-colors">{f.links?.servicios ?? "Servicios"}</a></li>
              <li><a href="#tarifas" className="text-gray-500 hover:text-blue-600 transition-colors">{f.links?.tarifas ?? "Tarifas"}</a></li>
              <li><a href="#contacto" className="text-gray-500 hover:text-blue-600 transition-colors">{f.links?.contacto ?? "Contacto"}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-6 uppercase tracking-wider text-sm">
              {f.legalTitle}
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">{f.legal?.legalNotice ?? "Aviso Legal"}</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">{f.legal?.privacy ?? "Privacidad"}</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">{f.legal?.cookies ?? "Cookies"}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p>{f.copyright}</p>
          <p>{f.designed}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
