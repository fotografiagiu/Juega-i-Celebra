import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Slide = { src: string; title?: string };
type Group = { id: string; title: string; subtitle?: string; slides: Slide[] };

function FanStack({
  slides,
  onOpen,
}: {
  slides: Slide[];
  onOpen: (index: number) => void;
}) {
  const preview = useMemo(() => slides.slice(0, 6), [slides]);

  return (
    <div className="fanScene" aria-label="Abrir galería">
      <div className="fanFrame">
        <div className="fanFloat">
          {preview.map((s, i) => {
            // igual que antes, abanico “controlado”
            const rotate = -12 + i * 4;
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

          <div className="fanGlow" />
          <div className="fanBottomBar">
            <button type="button" className="fanBtn" onClick={() => onOpen(0)}>
              Ver galería
              <span className="fanBtnIcon">↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryFan() {
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
        <p>Parque de bolas y el resto del local. Pulsa para ver todas las fotos.</p>
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

      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} />

      <style>{css}</style>
    </section>
  );
}

const css = `
.gallerySection{
  max-width: 1100px;
  margin: 0 auto;
  padding: 72px 16px;
}
.galleryHeader{
  text-align: center;
  margin-bottom: 22px;
}
.galleryHeader h2{
  margin: 0 0 6px;
  font-size: 30px;
  letter-spacing: .2px;
}
.galleryHeader p{
  margin: 0;
  opacity: .75;
}

.galleryGrid{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
@media (max-width: 900px){
  .galleryGrid{ grid-template-columns: 1fr; }
}

.galleryCard{
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 18px;
  padding: 16px;
  background: rgba(255,255,255,.04);
  overflow: hidden;
  backdrop-filter: blur(6px);
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
  opacity: .75;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 999px;
  padding: 6px 10px;
  white-space: nowrap;
}

/* Escena 3D */
.fanScene{
  perspective: 1100px;
}
.fanFrame{
  position: relative;
  border-radius: 18px;
  padding: 14px;
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(0,0,0,.10));
  border: 1px solid rgba(255,255,255,.14);
  box-shadow:
    0 18px 40px rgba(0,0,0,.25),
    inset 0 1px 0 rgba(255,255,255,.08);
  transform: rotateX(6deg);
  transition: transform .35s ease, box-shadow .35s ease;
}
@media (hover:hover){
  .fanFrame:hover{
    transform: rotateX(2deg) rotateY(-2deg) translateY(-2px);
    box-shadow:
      0 26px 60px rgba(0,0,0,.34),
      inset 0 1px 0 rgba(255,255,255,.10);
  }
}

/* Movimiento sutil “impactante” sin ser pesado */
.fanFloat{
  position: relative;
  height: 260px;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,.10), rgba(0,0,0,.12));
  overflow: hidden;
  animation: floaty 4.2s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce){
  .fanFloat{ animation: none; }
}
@keyframes floaty{
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

/* Abanico como antes */
.fanCard{
  position: absolute;
  width: 180px;
  height: 230px;
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(0,0,0,.28);
  transition: transform .20s ease, box-shadow .20s ease, filter .20s ease;
}
.fanCard img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
  filter: saturate(1.02) contrast(1.02);
}
@media (hover:hover){
  .fanCard:hover{
    box-shadow: 0 18px 38px rgba(0,0,0,.38);
    filter: saturate(1.06) contrast(1.05);
  }
}

/* Glow moderno */
.fanGlow{
  position:absolute;
  inset:-40px;
  background:
    radial-gradient(circle at 20% 20%, rgba(0,191,165,.22), rgba(0,0,0,0) 45%),
    radial-gradient(circle at 80% 70%, rgba(255,87,34,.18), rgba(0,0,0,0) 52%);
  pointer-events:none;
  mix-blend-mode: screen;
  opacity: .9;
}

/* Barra inferior con botón bonito */
.fanBottomBar{
  position:absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display:flex;
  justify-content:flex-end;
  pointer-events:none;
}
.fanBtn{
  pointer-events:auto;
  display:inline-flex;
  align-items:center;
  gap: 10px;
  border: none;
  padding: 10px 14px;
  border-radius: 999px;
  color: #0B0F14;
  font-weight: 700;
  letter-spacing: .2px;
  background: linear-gradient(135deg, #00BFA5, #FF5722);
  box-shadow: 0 14px 30px rgba(0,0,0,.30);
  cursor:pointer;
  transform: translateZ(0);
  transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
}
.fanBtnIcon{
  display:inline-flex;
  width: 22px;
  height: 22px;
  align-items:center;
  justify-content:center;
  border-radius: 999px;
  background: rgba(255,255,255,.22);
}
@media (hover:hover){
  .fanBtn:hover{
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(0,0,0,.40);
    filter: brightness(1.03);
  }
}
`;
