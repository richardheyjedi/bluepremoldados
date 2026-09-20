"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

const photos = [
  { src: "/gallery/montagem-estrutura-01.jpg", label: "Montagem estrutural", meta: "Estrutura em execução", alt: "Montagem de estrutura pré-moldada com pilares, vigas, caminhão e equipe em obra" },
  { src: "/gallery/instalacao-pilares-01.jpg", label: "Instalação de pilares", meta: "Etapa de montagem", alt: "Pilares pré-moldados sendo posicionados com auxílio de caminhão munck" },
  { src: "/gallery/montagem-estrutura-02.jpg", label: "Encaixe das peças", meta: "Execução no canteiro", alt: "Estrutura pré-moldada com pilares, vigas e peça sendo içada em obra" },
  { src: "/gallery/estrutura-urbana-01.jpg", label: "Estrutura em evolução", meta: "Sistema pré-moldado", alt: "Conjunto de pilares e vigas pré-moldadas em área urbana" },
  { src: "/gallery/estrutura-cobertura-01.jpg", label: "Cobertura e fechamento", meta: "Obra em andamento", alt: "Edificação pré-moldada com cobertura e fechamento lateral em execução" },
  { src: "/gallery/estrutura-urbana-02.jpg", label: "Precisão construtiva", meta: "Estrutura urbana", alt: "Estrutura de concreto pré-moldado com pilares e vigas entre edificações" },
  { src: "/gallery/estrutura-estacionamento-01.jpg", label: "Estrutura aplicada", meta: "Cobertura pré-moldada", alt: "Estrutura pré-moldada utilizada em área coberta de estacionamento" },
  { src: "/gallery/estrutura-local-01.jpg", label: "Base para avançar", meta: "Nova estrutura", alt: "Pilares e vigas pré-moldadas instalados em canteiro de obra" },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const moveSelection = (direction: number) => {
      setSelected((current) => current === null ? null : (current + direction + photos.length) % photos.length);
    };
    const onKey = (event: KeyboardEvent) => {
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
  }, [selected]);

  const move = (direction: number) => {
    setSelected((current) => current === null ? null : (current + direction + photos.length) % photos.length);
  };

  return (
    <>
      <div className="gallery-grid stagger-group">
        {photos.map((photo, index) => (
          <button type="button" key={photo.src} className={`gallery-item gallery-item--${index + 1} mask-reveal`} onClick={() => setSelected(index)} aria-label={`Ampliar foto: ${photo.label}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 55vw" className="gallery-item__image" />
            <span className="gallery-item__shade" aria-hidden="true" />
            <span className="gallery-item__index">{String(index + 1).padStart(2, "0")}</span>
            <span className="gallery-item__caption"><small>{photo.meta}</small><strong>{photo.label}</strong></span>
            <span className="gallery-item__expand" aria-hidden="true"><Expand size={17} /></span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria ampliada">
          <button type="button" className="lightbox__backdrop" onClick={() => setSelected(null)} aria-label="Fechar galeria" />
          <figure className="lightbox__content">
            <Image src={photos[selected].src} alt={photos[selected].alt} fill sizes="94vw" className="lightbox__image" />
            <span className="lightbox__shade" aria-hidden="true" />
            <figcaption><span>{String(selected + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span><div><small>{photos[selected].meta}</small><strong>{photos[selected].label}</strong></div></figcaption>
            <button type="button" className="lightbox__close" onClick={() => setSelected(null)} aria-label="Fechar visualização"><X /></button>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => move(-1)} aria-label="Foto anterior"><ArrowLeft /></button>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => move(1)} aria-label="Próxima foto"><ArrowRight /></button>
          </figure>
        </div>
      )}
    </>
  );
}
