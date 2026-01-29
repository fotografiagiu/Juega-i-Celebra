import React, { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

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
  ariaOpen,
  ariaOpenPhoto,
  btnView,
}: {
  slides: Slide[];
  onOpen: (index: number) => void;
  ariaOpen: string;
  ariaOpenPhoto: (n: number) => string;
  btnView: string;
}) {
  const preview = useMemo(() => slides.slice(0, 6), [slides]);

  return (
    <div
      className="fanScene"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(0)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(0)}
      aria-label={ariaOpen}
    >
      <div className="fanFrame">
        <div className="fanFloat">
          {preview.map((s, i) => {
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
                onClick={(ev) => {
                  ev.stopPropagation();
                  onOpen(i);
                }}
                aria-label={ariaOpenPhoto(i + 1)}
              >
                <img
                  src={s.src}
                  alt={s.title ?? ariaOpenPhoto(i + 1)}
                  loading="lazy"
                />
              </button>
            );
          })}

          <div className="fanGlow" />

          <div className="fanBottomBar">
            <button
              type="button"
              className="fanBtn"
              onClick={(ev) => {
                ev.stopPropagation();
                onOpen(0);
              }}
            >
              {btnView}
              <span className="fanBtnIcon">↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryFan({ lang }: Props) {
  const tr = t(lang);

  const groups: Group[] = [
    {
      id: "bolas",
      title: tr.gallery.groups.bolas.title,
      subtitle: tr.gallery.groups.bolas.subtitle,
      slides: [
        ...Array.from({ length: 10 }, (_, i) => ({
          src: `/gallery/Galeria${i + 1}.jpeg`,
          title: `${tr.gallery.groups.bolas.slidePrefix} ${i + 1}`,
        })),
        {
          src: `/gallery/Galeria21.jpeg`,
          title: `${tr.gallery.groups.bolas.slidePrefix} 21`,
        },
      ],
    },
    {
      id: "local",
      title: tr.gallery.groups.local.title,
      subtitle: tr.gallery.groups.local.subtitle,
      slides: Array.from({ length: 10 }, (_, i) => ({
        src: `/gallery/Galeria${i + 11}.jpeg`, // 11..20
        title: `${tr.gallery.groups.local.slidePrefix} ${i + 11}`,
      })),
    },
  ];

  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [index, setIndex] = useState(0);

  const slides = groups[activeGroup]?.slides ?? [];

  const openGallery = (groupIndex: number, i: number) => {
    setActiveGroup(groupIndex);
    setIndex(i);
    setOpen(true);
  };

  const photosLabel = (n: number) => `${n} ${tr.gallery.photosWord}`;

  return (
    <section className="gallerySection">
      <div className="galleryHeader">
        <h2 className="galleryTitle">
          <span className="galleryTitleGlow" />
          {tr.gallery.title}
        </h2>
        <p className="gallerySubtitle">{tr.gallery.subtitle}</p>
      </div>

      <div className="galleryGrid">
        {groups.map((g, gi) => (
          <div key={g.id} className="galleryCard">
            <div className="galleryCardTop">
              <div className="titleRow">
                <h3
                  className={`badge3d ${
                    g.id === "bolas" ? "badge3d--bolas" : "badge3d--local"
                  }`}
                >
                  {g.title}
                </h3>
                {g.subtitle && <p className="muted">{g.subtitle}</p>}
              </div>

              <span
                className={`count ${
                  g.id === "bolas" ? "count--bolas" : "count--local"
                }`}
              >
                {photosLabel(g.slides.length)}
              </span>
            </div>

            <FanStack
              slides={g.slides}
              onOpen={(i) => openGallery(gi, i)}
              ariaOpen={tr.gallery.ariaOpen}
              ariaOpenPhoto={(n) => `${tr.gallery.ariaOpenPhoto} ${n}`}
              btnView={tr.gallery.viewButton}
            />
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
  background:
    radial-gradient(circle at 20% 30%, rgba(0,191,165,.22), transparent 55%),
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

.badge3d--bolas{
  color:#073b3a;
  background: linear-gradient(135deg, rgba(0,191,165,.26), rgba(38,198,218,.18));
}
.badge3d--bolas::before{
  background: linear-gradient(135deg, #00BFA5, #26C6DA, #FF8A65);
}

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

/* ===== abanico 3D + botón ===== */
.fanScene{
  perspective: 1100px;
}

.fanFrame{
  position: relative;
  border-radius: 18px;
  padding: 14px;
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(0,0,0,.08));
  border: 1px solid rgba(0,0,0,.06);
  box-shadow:
    0 18px 40px rgba(0,0,0,.12),
    inset 0 1px 0 rgba(255,255,255,.7);
  transform: rotateX(6deg);
  transition: transform .35s ease, box-shadow .35s ease;
  cursor: pointer;
}

@media (hover:hover){
  .fanFrame:hover{
    transform: rotateX(2deg) rotateY(-2deg) translateY(-2px);
    box-shadow:
      0 26px 60px rgba(0,0,0,.16),
      inset 0 1px 0 rgba(255,255,255,.78);
  }
}

.fanFloat{
  position: relative;
  height: 260px;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,.10), rgba(0,0,0,.08));
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
  box-shadow: 0 14px 34px rgba(0,0,0,.22);
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
    box-shadow: 0 20px 46px rgba(0,0,0,.26);
    filter: saturate(1.06) contrast(1.05);
  }
}

.fanGlow{
  position:absolute;
  inset:-40px;
  background:
    radial-gradient(circle at 25% 20%, rgba(0,191,165,.18), rgba(0,0,0,0) 48%),
    radial-gradient(circle at 80% 75%, rgba(255,138,101,.14), rgba(0,0,0,0) 55%);
  pointer-events:none;
  mix-blend-mode: screen;
  opacity: .75;
}

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
  padding: 10px 16px;
  border-radius: 999px;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: .3px;
  background: linear-gradient(135deg, #00BFA5 0%, #26C6DA 55%, #FF8A65 100%);
  box-shadow: 
    0 10px 26px rgba(0,0,0,.20),
    inset 0 1px 0 rgba(255,255,255,.25);
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
  background: rgba(255,255,255,.18);
  backdrop-filter: blur(4px);
}

@media (hover:hover){
  .fanBtn:hover{
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(0,0,0,.26);
    filter: brightness(1.03);
  }
}
`;
