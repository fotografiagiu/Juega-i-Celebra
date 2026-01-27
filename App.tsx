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

import { getInitialLang, setLangStorage } from "./i18n";
import type { Lang } from "./i18n";
import LanguageModal from "./components/LanguageModal";
import LanguagePill from "./components/LanguagePill";

const LANG_MODAL_SEEN = "juga_lang_modal_seen";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // ✅ Idiomas
  const [lang, setLang] = useState<Lang>("val");
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Init idioma (val por defecto, guarda en localStorage)
  useEffect(() => {
    const initial = getInitialLang();
    setLang(initial);

    const seen = localStorage.getItem(LANG_MODAL_SEEN);
    if (!seen) setShowLangModal(true);
  }, []);

  const selectLang = (l: Lang) => {
    setLang(l);
    setLangStorage(l);
    localStorage.setItem(LANG_MODAL_SEEN, "1");
    setShowLangModal(false);
  };

  const toggleLang = () => {
    selectLang(lang === "val" ? "es" : "val");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* ✅ Selector fijo (VAL | ES) */}
      <LanguagePill lang={lang} onToggle={toggleLang} />

      {/* ✅ Popup inicial */}
      {showLangModal && (
        <LanguageModal
          currentLang={lang}
          onSelect={selectLang}
          onClose={() => {
            localStorage.setItem(LANG_MODAL_SEEN, "1");
            setShowLangModal(false);
          }}
        />
      )}

      {/* Navbar (si luego quieres traducir menús, aquí pasamos lang) */}
      <Navbar scrolled={scrolled} />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        <section id="servicios" className="py-20">
          <Services />
        </section>

        {/* 👇 DESTINO DEL BOTÓN */}
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
