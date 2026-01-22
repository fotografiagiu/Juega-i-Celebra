
const getScrollContainer = (): HTMLElement => {
  // El elemento que realmente hace scroll en la página (en SPAs suele ser un contenedor)
  // 1) Si existe un contenedor típico "root" o "app", úsalo si es scrollable
  const candidates = [
    document.getElementById("root"),
    document.getElementById("__next"),
    document.querySelector("main"),
    document.querySelector("#app"),
    document.querySelector("[data-scroll-container]"),
  ].filter(Boolean) as HTMLElement[];

  const isScrollable = (el: HTMLElement) => {
    const style = window.getComputedStyle(el);
    const oy = style.overflowY;
    return (oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight;
  };

  for (const el of candidates) {
    if (isScrollable(el)) return el;
  }

  // 2) fallback: busca el primer contenedor scrollable desde body hacia abajo
  const all = Array.from(document.querySelectorAll<HTMLElement>("*"));
  const first = all.find(isScrollable);
  if (first) return first;

  // 3) último recurso
  return (document.scrollingElement as HTMLElement) || document.documentElement;
};

const handleScroll = (id: string) => {
  setIsOpen(false);

  const target = document.getElementById(id);
  if (!target) {
    console.warn(`No encuentro el id="${id}"`);
    return;
  }

  const container = getScrollContainer();
  const NAVBAR_OFFSET = 120;

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const top = (targetRect.top - containerRect.top) + container.scrollTop - NAVBAR_OFFSET;

  container.scrollTo({ top, behavior: "smooth" });
};

