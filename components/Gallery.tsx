"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Photo = {
  src: string;
  label: string;
  meta: string;
  alt: string;
};

const workPhotos: Photo[] = [
  { src: "/gallery/montagem-estrutura-01.jpg", label: "Montagem estrutural", meta: "Estrutura em execução", alt: "Montagem de estrutura pré-moldada com pilares, vigas, caminhão e equipe em obra" },
  { src: "/gallery/instalacao-pilares-01.jpg", label: "Instalação de pilares", meta: "Etapa de montagem", alt: "Pilares pré-moldados sendo posicionados com auxílio de caminhão munck" },
  { src: "/gallery/montagem-estrutura-02.jpg", label: "Encaixe das peças", meta: "Execução no canteiro", alt: "Estrutura pré-moldada com pilares, vigas e peça sendo içada em obra" },
  { src: "/gallery/estrutura-urbana-01.jpg", label: "Estrutura em evolução", meta: "Sistema pré-moldado", alt: "Conjunto de pilares e vigas pré-moldadas em área urbana" },
  { src: "/gallery/estrutura-cobertura-01.jpg", label: "Cobertura e fechamento", meta: "Obra em andamento", alt: "Edificação pré-moldada com cobertura e fechamento lateral em execução" },
  { src: "/gallery/estrutura-urbana-02.jpg", label: "Precisão construtiva", meta: "Estrutura urbana", alt: "Estrutura de concreto pré-moldado com pilares e vigas entre edificações" },
  { src: "/gallery/estrutura-estacionamento-01.jpg", label: "Estrutura aplicada", meta: "Cobertura pré-moldada", alt: "Estrutura pré-moldada utilizada em área coberta de estacionamento" },
  { src: "/gallery/estrutura-local-01.jpg", label: "Base para avançar", meta: "Nova estrutura", alt: "Pilares e vigas pré-moldadas instalados em canteiro de obra" },
];

const modelPhotos: Photo[] = [
  { src: "/gallery/maquete-estrutura-multipavimentos-01.jpg", label: "Estrutura multipavimentos", meta: "Maquete estrutural · Perspectiva 01", alt: "Maquete eletrônica de estrutura pré-moldada multipavimentos com estacionamento" },
  { src: "/gallery/maquete-estrutura-multipavimentos-02.jpg", label: "Modulação estrutural", meta: "Maquete estrutural · Perspectiva 02", alt: "Vista lateral de maquete eletrônica com pilares, vigas e lajes pré-moldadas" },
  { src: "/gallery/maquete-estrutura-multipavimentos-03.jpg", label: "Sistema estrutural", meta: "Maquete estrutural · Perspectiva 03", alt: "Vista elevada de modelo estrutural multipavimentos em concreto pré-moldado" },
  { src: "/gallery/maquete-edificio-residencial-fachada.jpg", label: "Fachada residencial", meta: "Maquete eletrônica · Vista frontal", alt: "Maquete eletrônica da fachada de edifício residencial com quatro pavimentos" },
  { src: "/gallery/maquete-edificio-residencial-perspectiva.jpg", label: "Edifício residencial", meta: "Maquete eletrônica · Perspectiva externa", alt: "Perspectiva eletrônica de edifício residencial com varandas e terraço" },
  { src: "/gallery/maquete-edificio-residencial-estudo.jpg", label: "Estudo volumétrico", meta: "Modelo eletrônico · Perspectiva estrutural", alt: "Modelo eletrônico de edifício residencial visto em perspectiva lateral" },
];

const normalizeIndex = (index: number, total: number) => (index + total) % total;

function PhotoCarousel({ photos, ariaLabel }: { photos: Photo[]; ariaLabel: string }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const pointerStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const thumbnails = useRef<Array<HTMLButtonElement | null>>([]);
  const total = photos.length;

  const showSlide = (index: number) => setCurrent(normalizeIndex(index, total));
  const moveCarousel = (direction: number) => {
    setCurrent((active) => normalizeIndex(active + direction, total));
  };

  useEffect(() => {
    const moveSelection = (direction: number) => {
      setSelected((active) => active === null ? null : normalizeIndex(active + direction, total));
    };
    const onKey = (event: KeyboardEvent) => {
      if (selected === null) return;
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") moveSelection(-1);
      if (event.key === "ArrowRight") moveSelection(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = selected === null ? "" : "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, total]);

  useEffect(() => {
    thumbnails.current[current]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [current]);

  const moveLightbox = (direction: number) => {
    setSelected((active) => active === null ? null : normalizeIndex(active + direction, total));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStart.current = event.clientX;
    swiped.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 45) return;
    swiped.current = true;
    moveCarousel(distance > 0 ? -1 : 1);
  };

  const openPhoto = (index: number) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    setSelected(index);
  };

  return (
    <>
      <div
        className="gallery-carousel reveal"
        role="region"
        aria-roledescription="carrossel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") moveCarousel(-1);
          if (event.key === "ArrowRight") moveCarousel(1);
        }}
      >
        <div
          className="gallery-carousel__viewport"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
        >
          <div className="gallery-carousel__track" style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}>
            {photos.map((photo, index) => (
              <button
                type="button"
                key={photo.src}
                className="gallery-carousel__slide"
                onClick={() => openPhoto(index)}
                tabIndex={current === index ? 0 : -1}
                aria-hidden={current !== index}
                aria-label={`Ampliar foto: ${photo.label}`}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1279px) calc(100vw - 40px), 1240px" className="gallery-carousel__image" />
                <span className="gallery-carousel__shade" aria-hidden="true" />
                <span className="gallery-carousel__caption"><small>{photo.meta}</small><strong>{photo.label}</strong></span>
                <span className="gallery-carousel__expand" aria-hidden="true"><Expand size={18} /></span>
              </button>
            ))}
          </div>

          <div className="gallery-carousel__nav" aria-label="Navegação da galeria">
            <button type="button" onClick={() => moveCarousel(-1)} aria-label="Foto anterior"><ArrowLeft /></button>
            <button type="button" onClick={() => moveCarousel(1)} aria-label="Próxima foto"><ArrowRight /></button>
          </div>
          <span className="gallery-carousel__counter" aria-live="polite">{String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>

        <div className="gallery-carousel__footer">
          <div className="gallery-carousel__progress" aria-hidden="true"><span style={{ transform: `scaleX(${(current + 1) / total})` }} /></div>
          <div className="gallery-carousel__thumbs" aria-label="Selecionar foto">
            {photos.map((photo, index) => (
              <button
                type="button"
                key={photo.src}
                ref={(element) => { thumbnails.current[index] = element; }}
                className={current === index ? "is-active" : ""}
                onClick={() => showSlide(index)}
                aria-label={`Exibir foto ${index + 1}: ${photo.label}`}
                aria-current={current === index ? "true" : undefined}
              >
                <Image src={photo.src} alt="" fill sizes="88px" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria ampliada">
          <button type="button" className="lightbox__backdrop" onClick={() => setSelected(null)} aria-label="Fechar galeria" />
          <figure className="lightbox__content">
            <Image src={photos[selected].src} alt={photos[selected].alt} fill sizes="94vw" className="lightbox__image" />
            <span className="lightbox__shade" aria-hidden="true" />
            <figcaption><span>{String(selected + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><div><small>{photos[selected].meta}</small><strong>{photos[selected].label}</strong></div></figcaption>
            <button type="button" className="lightbox__close" onClick={() => setSelected(null)} aria-label="Fechar visualização" autoFocus><X /></button>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => moveLightbox(-1)} aria-label="Foto anterior"><ArrowLeft /></button>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => moveLightbox(1)} aria-label="Próxima foto"><ArrowRight /></button>
          </figure>
        </div>
      )}
    </>
  );
}

export function Gallery() {
  return (
    <div className="gallery-series">
      <PhotoCarousel photos={workPhotos} ariaLabel="Fotos de obras da Blue Premoldados" />

      <div className="gallery-collection" aria-labelledby="models-gallery-title">
        <div className="gallery-collection__heading">
          <div>
            <span className="eyebrow reveal">Projetos em 3D</span>
            <h3 id="models-gallery-title" className="reveal">Maquetes eletrônicas.</h3>
          </div>
          <p className="reveal">Representações digitais de projetos estruturais e arquitetônicos, apresentadas separadamente das obras executadas.</p>
        </div>
        <PhotoCarousel photos={modelPhotos} ariaLabel="Galeria de projetos em maquete eletrônica" />
      </div>
    </div>
  );
}
