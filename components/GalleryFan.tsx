import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Slide = { src: string; title?: string };

type Group = {
  id: "bolas" | "local";
  title: string;
  subtitle?: string;
  slides: Slide[];
};

function FanStack({
  slides,
  onOpen,
  accent = "teal",
}: {
  slides: Slide[];
  onOpen: (index: number) => void;
  accent?: "teal" | "purple";
}) {
  const preview = useMemo(() => slides.slice(0, 6), [slides]);

  return (
    <div className={`fanWrap fanWrap--${accent}`}>
      {preview.map((s, i) => {
        // abanico + profundidad
        const rotate = -14 + i * 6; // abanico
        const x = -26 + i * 14;
        const y = 10 - i * 2;

        return (
          <button
            key={s.src}
            type="button"
            className="fanCard"
            style={{
              transform: `translate3d(${x}px, ${y}px, ${i * 6}px) rotate(${rotate}deg)`,
              zIndex: 10 + i,
            }}
            onClick={() => onOpen(i)}
            aria-label={`Abrir foto ${i + 1}`}
          >
            <img src={s.src} alt={s.title ?? `Foto ${i + 1}`} loading="lazy" />
          </button>
        );
      })}

      <div className="fanCta" onClick={() => onOpen(0)} role="button" tabIndex={0}>
        <span>Ver galería</span>
        <span className="fanArrow">➜</span>
      </div>

      <div className="fanHint">Haz clic</div>
    </div>
  );
}

export default function GalleryFan() {
  // ✅ IMPORTANTE: tus imágenes están en /public/gallery y se sirven como /gallery/...
  // En tu repo se llaman Galeria1.jpeg ... Galeria21.jpeg
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
        src: `/gallery/Galeria${i + 11}.jpeg`, // 11..20
        title: `Local ${i + 11}`,
      })),
    },
  ];

  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<number>(0);
  const [index, setIndex] = useState(0);

  const slides = groups[activeGroup]?.slides ?? [];

  const openGallery = (groupIndex: number, i: number) => {
    setActiveGroup(groupIndex);
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className="gallerySection" id="galeria">
      <div className="galleryHeader">
        <h2 className="galleryTitle">
          <span className="galleryTitleGlow" />
          Galería
        </h2>
        <p className="gallerySubtitle">Parque de bolas y el resto del local. Pulsa para ver todas las fotos.</p>
      </div>

      <div className="galleryGrid">
        {groups.map((g, gi) => (
          <div key={g.id} className="galleryCard">
            <div className="galleryCardTop">
              <div className="titleRow">
                <h3 className={`badge3d badge3d--${g.id}`}>{g.title}</h3>
                {g.subtitle && <p className="muted">{g.subtitle}</p>}
              </div>

              <span className={`count count--${g.id}`}>{g.slides.length} fotos</span>
            </div>

            <FanStack
              slides={g.slides}
              onOpen={(i) => openGallery(gi, i)}
              accent={g.id === "bolas" ? "teal" : "purple"}
            />
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
  padding: 64px 16px;
}

.galleryHeader{
  text-align: center;
  margin-bottom: 20px;
}

.galleryTitle{
  position: relative;
  display: inline-block;
  margin: 0 0 10px;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: .3px;
  color: #0f172a;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(0,0,0,.06);
  box-shadow:
    0 16px 44px rgba(0,0,0,.12),
    inset 0 1px 0 rgba(255,255,255,.85);
  backdrop-filter: blur(10px);
}

.galleryTitleGlow{
  position:absolute;
  inset:-10px;
  border-radius: 999px;
  background: radial-gradient(circle at 20% 30%, rgba(0,191,165,.22), transparent 55%),
              radial-gradient(circle at 80% 70%, rgba(156,39,176,.18), transparent 55%),
              radial-gradient(circle at 60% 20%, rgba(255,138,101,.16), transparent 55%);
  filter: blur(10px);
  z-index:-1;
  animation: glowFloat 4.5s ease-in-out infinite;
}

@keyframes glowFloat{
  0%,100%{ transform: translateY(0); opacity:.95; }
  50%{ transform: translateY(-3px); opacity:1; }
}

.gallerySubtitle{
  margin: 0;
  opacity: .75;
}

.galleryGrid{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 900px){
  .galleryGrid{ grid-template-columns: 1fr; }
  .galleryTitle{ font-size: 30px; }
}

.galleryCard{
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 18px;
  padding: 16px;
  background: rgba(255,255,255,.48);
  overflow: hidden;
  box-shadow:
    0 18px 46px rgba(0,0,0,.10),
    inset 0 1px 0 rgba(255,255,255,.85);
  backdrop-filter: blur(10px);
}

.galleryCardTop{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.titleRow{
  display:flex;
  flex-direction:column;
  gap: 6px;
}

.muted{
  margin: 0;
  opacity: .72;
  font-size: 13px;
}

/* ===== BADGE 3D (títulos) ===== */
.badge3d{
  display:inline-flex;
  align-items:center;
  gap: 10px;
  width: fit-content;
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: .2px;
  border: 1px solid rgba(0,0,0,.06);
  box-shadow:
    0 14px 34px rgba(0,0,0,.12),
    inset 0 1px 0 rgba(255,255,255,.75);
  transform: translateZ(0);
}

.badge3d::before{
  content:"";
  width: 10px;
  height: 10px;
  border-radius: 999px;
  box-shadow: 0 8px 16px rgba(0,0,0,.20);
}

/* bolas: turquesa moderno */
.badge3d--bolas{
  color:#073b3a;
  background: linear-gradient(135deg, rgba(0,191,165,.26), rgba(38,198,218,.18));
}
.badge3d--bolas::before{
  background: linear-gradient(135deg, #00BFA5, #26C6DA, #FF8A65);
}

/* local: morado elegante */
.badge3d--local{
  color:#2a1040;
  background: linear-gradient(135deg, rgba(156,39,176,.22), rgba(103,58,183,.16));
}
.badge3d--local::before{
  background: linear-gradient(135deg, #9C27B0, #673AB7, #26C6DA);
}

@media (hover:hover){
  .badge3d{
    transition: transform .22s ease, box-shadow .22s ease;
  }
  .badge3d:hover{
    transform: translateY(-1px);
    box-shadow:
      0 18px 44px rgba(0,0,0,.14),
      inset 0 1px 0 rgba(255,255,255,.82);
  }
}

/* ===== contador ===== */
.count{
  font-size: 12px;
  font-weight: 900;
  border-radius: 999px;
  padding: 7px 12px;
  white-space: nowrap;
  border: 1px solid rgba(0,0,0,.06);
  background: rgba(255,255,255,.70);
  box-shadow:
    0 10px 22px rgba(0,0,0,.10),
    inset 0 1px 0 rgba(255,255,255,.8);
  color: rgba(15,23,42,.78);
}

.count--bolas{
  background: linear-gradient(135deg, rgba(255,255,255,.72), rgba(0,191,165,.10));
}
.count--local{
  background: linear-gradient(135deg, rgba(255,255,255,.72), rgba(156,39,176,.09));
}

/* ===== abanico ===== */
.fanWrap{
  position: relative;
  height: 250px;
  border-radius: 16px;
  border: 1px dashed rgba(0,0,0,.10);
  background:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,.65), rgba(255,255,255,.30)),
    radial-gradient(circle at 90% 80%, rgba(0,0,0,.08), transparent 55%);
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  perspective: 900px;
  transform-style: preserve-3d;
}

.fanWrap--teal::after,
.fanWrap--purple::after{
  content:"";
  position:absolute;
  inset:-40px;
  z-index:0;
  filter: blur(22px);
  opacity:.65;
  animation: aura 6s ease-in-out infinite;
}

.fanWrap--teal::after{
  background: radial-gradient(circle at 25% 30%, rgba(0,191,165,.28), transparent 55%),
              radial-gradient(circle at 70% 70%, rgba(38,198,218,.24), transparent 55%),
              radial-gradient(circle at 60% 25%, rgba(255,138,101,.18), transparent 55%);
}

.fanWrap--purple::after{
  background: radial-gradient(circle at 25% 30%, rgba(156,39,176,.26), transparent 55%),
              radial-gradient(circle at 70% 70%, rgba(103,58,183,.22), transparent 55%),
              radial-gradient(circle at 60% 25%, rgba(38,198,218,.14), transparent 55%);
}

@keyframes aura{
  0%,100%{ transform: translateY(0); }
  50%{ transform: translateY(-8px); }
}

.fanCard{
  position: absolute;
  width: 185px;
  height: 225px;
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    0 14px 34px rgba(0,0,0,.22),
    inset 0 1px 0 rgba(255,255,255,.25);
  transition: transform .22s ease, box-shadow .22s ease, filter .22s ease;
  z-index:1;
}

.fanCard img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
}

@media (hover:hover){
  .fanWrap:hover .fanCard{
    filter: saturate(1.06) contrast(1.02);
  }
  .fanCard:hover{
    transform: translate3d(0, -6px, 22px) rotate(0deg) scale(1.02);
    box-shadow: 0 20px 46px rgba(0,0,0,.28);
  }
}

/* CTA botón bonito */
.fanCta{
  position:absolute;
  right: 14px;
  bottom: 14px;
  z-index:2;
  display:flex;
  align-items:center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  cursor:pointer;
  user-select:none;
  font-weight: 900;
  font-size: 13px;
  color: #063a38;
  background: linear-gradient(135deg, rgba(0,191,165,.28), rgba(38,198,218,.22), rgba(255,138,101,.18));
  border: 1px solid rgba(0,0,0,.06);
  box-shadow:
    0 14px 36px rgba(0,0,0,.16),
    inset 0 1px 0 rgba(255,255,255,.75);
}

.fanArrow{
  display:inline-flex;
  width: 26px;
  height: 26px;
  align-items:center;
  justify-content:center;
  border-radius: 999px;
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 10px 18px rgba(0,0,0,.12);
}

@media (hover:hover){
  .fanCta{
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .fanCta:hover{
    transform: translateY(-1px);
    box-shadow:
      0 18px 44px rgba(0,0,0,.18),
      inset 0 1px 0 rgba(255,255,255,.82);
  }
}

.fanHint{
  position:absolute;
  left: 14px;
  bottom: 14px;
  z-index:2;
  font-size: 12px;
  opacity: .78;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.06);
  background: rgba(255,255,255,.55);
  box-shadow: 0 12px 24px rgba(0,0,0,.10);
}
`;
