import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Slide = { src: string; title?: string };

type Group = {
  id: string;
  title: string;
  subtitle?: string;
  slides: Slide[];
};

function FanStack({
  slides,
  onOpen,
}: {
  slides: Slide[];
  onOpen: (index: number) => void;
}) {
  const preview = useMemo(() => slides.slice(0, 6), [slides]);

  return (
    <div className="fanWrap">
      {preview.map((s, i) => {
        const rotate = -12 + i * 4; // abanico
        const x = i * 16;
        const y = i * 5;

        return (
          <button
            key={s.src}
            type="button"
            className="fanCard"
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
              zIndex: 10 + i,
            }}
            onClick={() => onOpen(i)}
            aria-label={`Abrir foto ${i + 1}`}
          >
            <img src={s.src} alt={s.title ?? `Foto ${i + 1}`} loading="lazy" />
          </button>
        );
      })}
      <div className="fanHint">Ver galería</div>
    </div>
  );
}

export default function GalleryFan() {
  // ✅ Tus fotos reales en /public/gallery:
  // Galeria1.jpeg ... Galeria21.jpeg
  const groups: Group[] = [
    {
      id: "bolas",
      title: "Parque de bolas",
      subtitle: "Zona de juego",
      slides: Array.from({ length: 10 }, (_, i) => ({
        src: `/gallery/Galeria${i + 1}.jpeg`,
        title: `Parque de bolas ${i + 1}`,
      })),
    },
    {
      id: "local",
      title: "El local",
      subtitle: "Mesas, cocina, aseo y zonas comunes",
      slides: Array.from({ length: 11 }, (_, i) => ({
        src: `/gallery/Galeria${i + 11}.jpeg`,
        title: `Local ${i + 11}`,
      })),
    },
  ];

  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [index, setIndex] = useState(0);

  const slides = groups[activeGroup].slides;

  const openGallery = (groupIndex: number, i: number) => {
    setActiveGroup(groupIndex);
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className="gallerySection">
      <div className="galleryHeader">
        <h2>Galería</h2>
        <p>Haz clic para ver todas las fotos.</p>
      </div>

      <div className="galleryGrid">
        {groups.map((g, gi) => (
          <div key={g.id} className="galleryCard">
            <div className="galleryCardTop">
              <div>
                <h3>{g.title}</h3>
                {g.subtitle && <p className="muted">{g.subtitle}</p>}
              </div>
              <span className="count">{g.slides.length} fotos</span>
            </div>

            <FanStack slides={g.slides} onOpen={(i) => openGallery(gi, i)} />
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
      />

      <style>{css}</style>
    </section>
  );
}

const css = `
.gallerySection{
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 16px;
}
.galleryHeader h2{
  margin: 0 0 6px;
  font-size: 28px;
}
.galleryHeader p{
  margin: 0 0 18px;
  opacity: .75;
}
.galleryGrid{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 900px){
  .galleryGrid{ grid-template-columns: 1fr; }
}
.galleryCard{
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 16px;
  padding: 16px;
  background: rgba(255,255,255,.04);
  overflow: hidden;
}
.galleryCardTop{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.galleryCardTop h3{
  margin: 0;
  font-size: 18px;
}
.muted{
  margin: 6px 0 0;
  opacity: .7;
  font-size: 14px;
}
.count{
  font-size: 12px;
  opacity: .7;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 999px;
  padding: 6px 10px;
  white-space: nowrap;
}

.fanWrap{
  position: relative;
  height: 240px;
  border-radius: 14px;
  background: rgba(0,0,0,.12);
  border: 1px dashed rgba(255,255,255,.12);
  display:flex;
  align-items:center;
  justify-content:center;
}
.fanCard{
  position: absolute;
  width: 180px;
  height: 220px;
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(0,0,0,.25);
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease;
}
.fanCard img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
}
.fanCard:hover{
  box-shadow: 0 14px 30px rgba(0,0,0,.35);
}
.fanHint{
  position:absolute;
  bottom: 10px;
  right: 12px;
  font-size: 12px;
  opacity: .75;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.25);
}
`;
