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
  const preview = useMemo(() => slides.slice(0, 7), [slides]); // 7 cartas = más wow

  return (
    <div className="fanWrap" role="button" tabIndex={0} onClick={() => onOpen(0)} onKeyDown={(e) => e.key === "Enter" && onOpen(0)}>
      {preview.map((s, i) => {
        // valores "cerrado" (default)
        const rotate = -10 + i * 3;
        const x = i * 10;
        const y = i * 4;

        return (
          <button
            key={s.src}
            type="button"
            className="fanCard"
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
              zIndex: 10 + i,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen(i);
            }}
            aria-label={`Abrir foto ${i + 1}`}
          >
            <img src={s.src} alt={s.title ?? `Foto ${i + 1}`} loading="lazy" />
          </button>
        );
      })}

      <div className="fanOverlay" />
      <div className="fanCTA">
        <span className="fanCTATitle">Ver galería</span>
        <span className="fanCTASub">Haz clic para ampliar</span>
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

/* FAN */
.fanWrap{
  position: relative;
  height: 260px;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,.08), rgba(0,0,0,.10));
  border: 1px dashed rgba(255,255,255,.14);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
}

.fanCard{
  position: absolute;
  width: 190px;
  height: 240px;
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 26px rgba(0,0,0,.28);
  cursor: pointer;
  transition: transform .28s ease, box-shadow .28s ease, filter .28s ease;
}
.fanCard img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
  filter: saturate(1.03) contrast(1.03);
}

/* Hover: el abanico se abre (solo desktop) */
@media (hover:hover){
  .fanWrap:hover .fanCard{
    box-shadow: 0 18px 36px rgba(0,0,0,.38);
  }
  .fanWrap:hover .fanCard:nth-child(1){ transform: translate(-40px, 16px) rotate(-22deg) scale(1.02); }
  .fanWrap:hover .fanCard:nth-child(2){ transform: translate(-20px, 10px) rotate(-14deg) scale(1.02); }
  .fanWrap:hover .fanCard:nth-child(3){ transform: translate(0px, 6px) rotate(-6deg) scale(1.02); }
  .fanWrap:hover .fanCard:nth-child(4){ transform: translate(20px, 6px) rotate(2deg) scale(1.02); }
  .fanWrap:hover .fanCard:nth-child(5){ transform: translate(40px, 10px) rotate(10deg) scale(1.02); }
  .fanWrap:hover .fanCard:nth-child(6){ transform: translate(60px, 16px) rotate(18deg) scale(1.02); }
  .fanWrap:hover .fanCard:nth-child(7){ transform: translate(80px, 22px) rotate(26deg) scale(1.02); }
}

.fanOverlay{
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,.38) 100%);
  pointer-events:none;
}

.fanCTA{
  position:absolute;
  left: 14px;
  bottom: 12px;
  display:flex;
  flex-direction:column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(0,0,0,.28);
  backdrop-filter: blur(6px);
  pointer-events:none;
}
.fanCTATitle{
  font-size: 13px;
  letter-spacing: .2px;
}
.fanCTASub{
  font-size: 12px;
  opacity: .75;
}
`;
