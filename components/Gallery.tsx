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
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.galeria img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 14px;
}
