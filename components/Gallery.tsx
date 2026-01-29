import GalleryFan from "./GalleryFan";
import type { Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

export default function Gallery({ lang }: Props) {
  return <GalleryFan lang={lang} />;
}
