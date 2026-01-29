// components/Gallery.tsx
import React from "react";
import type { Lang } from "../src/i18n";
import GalleryFan from "./GalleryFan";

type Props = { lang: Lang };

export default function Gallery({ lang }: Props) {
  return <GalleryFan lang={lang} />;
}

