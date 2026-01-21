import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Services from "./components/Services";
// import Features from "./components/Features";
// import Gallery from "./components/Gallery";
// import Pricing from "./components/Pricing";
// import Testimonials from "./components/Testimonials";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import ChatAssistant from "./components/ChatAssistant";
// import BookingCalendar from "./components/BookingCalendar";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Juga i Celebra</h1>
      <p>Debug ON</p>

      {/* 1) prueba Navbar */}
      <Navbar scrolled={scrolled} />

      {/* 2) luego vas activando uno a uno */}
      {/* <Hero /> */}
      {/* <Services /> */}
      {/* <BookingCalendar /> */}
      {/* <Features /> */}
      {/* <Gallery /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
      {/* <ChatAssistant /> */}
    </div>
  );
}
