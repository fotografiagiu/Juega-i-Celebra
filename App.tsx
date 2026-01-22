
import React, { useState, useEffect } from "react";
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

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <Navbar scrolled={scrolled} />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        <section id="servicios" className="py-20">
          <Services />
        </section>

        {/* 👇 DESTINO DEL BOTÓN */}
        <section
          id="reservar"
          className="py-20 bg-gray-50 scroll-mt-28"
        >
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
