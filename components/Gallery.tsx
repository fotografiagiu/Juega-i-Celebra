const images = [
  ...Array.from({ length: 19 }, (_, i) => `/images/galeria/galeria${i + 1}.jpg`),
  "/images/galeria/20.jpg",
];

export default function Galeria() {
  return (
    <section className="galeria">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Galería ${index + 1}`} />
      ))}
    </section>
  );
}
