import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

type Slide = { src: string; title?: string };

type GroupId = "bolas" | "local";

type Group = {
  id: GroupId;
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
        src: `/gallery/Galeria${i + 11}.jpeg`,
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
/* (TU CSS ORIGINAL AQUÍ TAL CUAL) */
${""}
`;
