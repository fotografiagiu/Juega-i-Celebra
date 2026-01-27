import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingCalendar from "./components/BookingCalendar";
import ChatAssistant from "./components/ChatAssistant";

import LanguageModal from "./src/components/LanguageModal";
import LanguagePill from "./src/components/LanguagePill";
import { getSavedLang, saveLang, type Lang } from "./src/i18n";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  const [lang, setLang] = useState<Lang>("val");
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 1) Cargar idioma una vez
  useEffect(() => {
    const saved = getSavedLang();
    if (saved) {
      setLang(saved);
      setShowLangModal(false);
    } else {
      setLang("val"); // predomina valencià
      setShowLangModal(true); // pregunta 1ª vez
    }
  }, []);

  // 2) Selección idioma (único sitio donde se guarda)
  const handleSelectLang = (l: Lang) => {
    setLang(l);
    saveLang(l);
    setShowLangModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <LanguageModal
        open={showLangModal}
        onSelect={handleSelectLang}
        onClose={() => setShowLangModal(false)}
      />

      <LanguagePill current={lang} onClick={() => setShowLangModal(true)} />

      {/* IMPORTANTE: Navbar tiene que aceptar lang y usarlo */}
      <Navbar scrolled={scrolled} lang={lang} />

      <main>
        <section id="inicio">
         <Hero lang={lang} />
        </section>

        <section id="servicios" className="py-20">
          <Services />
        </section>

        <section id="reservar" className="py-20 bg-gray-50 scroll-mt-28">
          <BookingCalendar />
        </section>

        <section className="py-20">
          <Features />
        </section>

        <section className="py-20 bg-yellow-50">
          <Gallery />
        </section>

        <section id="tarifas" className="py-20 scroll-mt-28">
          <Pricing />
        </section>

        <section id="contacto" className="py-20">
          <Contact />
        </section>
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default App;
