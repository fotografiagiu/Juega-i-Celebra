// components/Footer.tsx
import React from "react";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

const Footer: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);

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
              {tr.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-6 uppercase tracking-wider text-sm">
              {tr.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {tr.footer.links.inicio}
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {tr.footer.links.servicios}
                </a>
              </li>
              <li>
                <a
                  href="#tarifas"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {tr.footer.links.tarifas}
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {tr.footer.links.contacto}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-6 uppercase tracking-wider text-sm">
              {tr.footer.legalTitle}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {tr.footer.legal.legalNotice}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {tr.footer.legal.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {tr.footer.legal.cookies}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:row items-center justify-between gap-4 text-gray-400 text-sm">
          <p>{tr.footer.copyright}</p>
          <p>{tr.footer.designed}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
