"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Blocks, Grid3X3, Layers3, MoveDiagonal2, Columns3 } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

const products = [
  { number: "01", title: "Pilares pré-moldados", text: "Elementos verticais para compor estruturas de diferentes tipologias.", icon: Columns3 },
  { number: "02", title: "Tesouras estruturais", text: "Componentes para a organização e sustentação de coberturas.", icon: MoveDiagonal2 },
  { number: "03", title: "Contraventamentos", text: "Peças que integram o sistema estrutural conforme a necessidade do projeto.", icon: Layers3 },
  { number: "04", title: "Pisos intertravados", text: "Soluções modulares em concreto para áreas externas e de circulação.", icon: Grid3X3 },
  { number: "05", title: "Peças sob consulta", text: "Outros componentes pré-moldados avaliados de acordo com cada aplicação.", icon: Blocks },
];

export function ProductScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };
      if (!desktop || reduce) return;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 900)}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  const move = (direction: number) => trackRef.current?.scrollBy({ left: direction * 310, behavior: "smooth" });

  return (
    <section className="products-section dark-section" id="produtos" ref={sectionRef} aria-labelledby="products-title">
      <div className="products-section__top shell">
        <div>
          <span className="eyebrow eyebrow--light reveal">Produtos</span>
          <h2 id="products-title" className="section-title section-title--light reveal">Peças que sustentam<br />grandes projetos.</h2>
        </div>
        <p className="products-section__intro reveal">Produzimos componentes para diferentes necessidades estruturais, atendendo às características de cada projeto.</p>
      </div>
      <div className="product-track" ref={trackRef} role="region" aria-label="Produtos disponíveis" tabIndex={0}>
        {products.map(({ icon: Icon, ...product }) => (
          <article className="product-card" key={product.title}>
            <div className="product-card__top"><span>{product.number}</span><Icon size={29} strokeWidth={1.5} aria-hidden="true" /></div>
            <div className="product-card__diagram" aria-hidden="true"><i /><i /><i /></div>
            <div><h3>{product.title}</h3><p>{product.text}</p></div>
          </article>
        ))}
      </div>
      <div className="mobile-carousel-controls shell">
        <button type="button" onClick={() => move(-1)} aria-label="Produto anterior"><ArrowLeft /></button>
        <span>Deslize para explorar</span>
        <button type="button" onClick={() => move(1)} aria-label="Próximo produto"><ArrowRight /></button>
      </div>
    </section>
  );
}
