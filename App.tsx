import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <Navbar scrolled={scrolled} />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        <section id="servicios">
          <Services />
        </section>
      </main>
    </div>
  );
}
