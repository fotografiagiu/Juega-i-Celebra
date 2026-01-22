
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatAssistant from "./components/ChatAssistant";
import BookingCalendar from './components/BookingCalendar';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scroller = document.getElementById("scroll-container");

    if (!scroller) return;

    const handleScroll = () => {
      setScrolled(scroller.scrollTop > 50);
    };

    scroller.addEventListener("scroll", handleScroll);
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="scroll-container"
      className="min-h-screen bg-white text-gray-800 overflow-x-hidden overflow-y-auto"
    >
      <Navbar scrolled={scrolled} />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        <section id="servicios" className="scroll-mt-32">
          <Services />
        </section>

        <section
          id="reservar"
          className="py-20 bg-gray-50/50 scroll-mt-32"
        >
          <BookingCalendar />
        </section>

        <section id="por-que-nosotros" className="py-20 scroll-mt-32">
          <Features />
        </section>

        <section id="galeria" className="py-20 bg-yellow-50/50 scroll-mt-32">
          <Gallery />
        </section>

        <section id="tarifas" className="py-20 scroll-mt-32">
          <Pricing />
        </section>

        <section id="contacto" className="py-20 scroll-mt-32">
          <Contact />
        </section>
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default App;
