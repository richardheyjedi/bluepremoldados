"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Building2,
  Check,
  Clock3,
  Factory,
  Home,
  MapPin,
  MessageCircle,
  MoveUpRight,
  Ruler,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { ContactForm } from "./ContactForm";
import { Gallery } from "./Gallery";
import { navigation, siteConfig, whatsappHref } from "@/lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    title: "Galpões",
    text: "Estruturas para operações comerciais, industriais, logísticas e agrícolas.",
    image: "/images/service-galpoes.webp",
    icon: Warehouse,
    alt: "Estrutura editorial de galpão pré-moldado em construção",
  },
  {
    title: "Prédios",
    text: "Sistemas pré-moldados para projetos que pedem organização e precisão.",
    image: "/images/service-predios.webp",
    icon: Building2,
    alt: "Estrutura editorial de prédio pré-moldado em construção",
  },
  {
    title: "Casas",
    text: "Soluções residenciais resistentes com processos construtivos mais eficientes.",
    image: "/images/service-casas.webp",
    icon: Home,
    alt: "Estrutura editorial de residência pré-moldada em construção",
  },
];

const products = [
  "Pilares pré-moldados",
  "Tesouras estruturais",
  "Contraventamentos",
  "Pisos intertravados",
  "Outras peças sob consulta",
];

const benefits = [
  { title: "Solução sob medida", text: "Cada estrutura parte da necessidade real do projeto.", icon: Ruler },
  { title: "Construção eficiente", text: "Organização e agilidade para a obra continuar avançando.", icon: Clock3 },
  { title: "Base resistente", text: "Componentes pensados para formar sistemas sólidos e confiáveis.", icon: ShieldCheck },
];

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)" }, (context) => {
      const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
      if (!motion) {
        gsap.set([".hero-animate", ".reveal", ".stagger-group > *"], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-kicker", { y: 14, autoAlpha: 0, duration: 0.4 })
        .from(".hero-title-line", { yPercent: 108, duration: 0.72, stagger: 0.08 }, "-=0.15")
        .from(".hero-copy", { y: 18, autoAlpha: 0, duration: 0.48 }, "-=0.28")
        .from(".hero-actions", { y: 15, autoAlpha: 0, duration: 0.45 }, "-=0.24");

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 26,
          autoAlpha: 0,
          duration: 0.62,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 89%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stagger-group").forEach((group) => {
        gsap.from(group.children, {
          y: 28,
          autoAlpha: 0,
          duration: 0.58,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });

      if (desktop) {
        gsap.to(".about-compact__visual img", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: ".about-compact__visual", start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      }

      gsap.to(".scroll-progress__bar", {
        scaleX: 1,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      });
    });

    return () => mm.revert();
  }, { scope: rootRef });

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress__bar" /></div>
      <Header />

      <main id="conteudo">
        <section className="hero hero--compact" id="inicio" aria-labelledby="hero-title">
          <Image src="/images/hero-structure.webp" alt="Estrutura editorial de concreto pré-moldado em montagem" fill preload sizes="100vw" className="hero__image" />
          <div className="hero__overlay" />
          <div className="hero__content shell">
            <div className="hero__copy-column">
              <span className="hero-kicker hero-animate"><Blocks size={17} /> Construção e peças pré-moldadas</span>
              <h1 id="hero-title">
                <span className="hero-title-mask"><span className="hero-title-line">Estruturas fortes.</span></span>
                <span className="hero-title-mask"><span className="hero-title-line hero-title-line--accent">Obras que avançam.</span></span>
              </h1>
              <p className="hero-copy hero-animate">Soluções pré-moldadas para projetos residenciais, comerciais e industriais na Paraíba e no Rio Grande do Norte.</p>
              <div className="hero-actions hero-animate">
                <a className="button button--yellow" href={whatsappHref()}>Solicitar orçamento <ArrowUpRight size={18} /></a>
                <a className="button button--ghost" href="#solucoes">Conhecer soluções <ArrowDown size={18} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="compact-intro" aria-label="Resumo da atuação">
          <div className="shell compact-intro__grid stagger-group">
            <div><Factory aria-hidden="true" /><span>Projetos</span><strong>Residenciais, comerciais e industriais</strong></div>
            <div><MapPin aria-hidden="true" /><span>Atuação</span><strong>Paraíba e Rio Grande do Norte</strong></div>
            <div><Check aria-hidden="true" /><span>Soluções</span><strong>Estruturas e peças pré-moldadas</strong></div>
          </div>
        </section>

        <section className="services section" id="solucoes" aria-labelledby="services-title">
          <div className="shell">
            <div className="section-heading section-heading--compact">
              <div><span className="eyebrow reveal">Soluções</span><h2 id="services-title" className="section-title reveal">Estruturas para<br />diferentes projetos.</h2></div>
              <p className="reveal">Construção especializada e componentes de concreto reunidos em uma solução objetiva.</p>
            </div>
            <div className="services-grid stagger-group">
              {services.map(({ icon: Icon, ...service }) => (
                <article className="service-card service-card--compact" key={service.title}>
                  <div className="service-card__media"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 100vw, 33vw" /></div>
                  <div className="service-card__body"><Icon aria-hidden="true" /><h3>{service.title}</h3><p>{service.text}</p><a href="#contato">Solicitar orçamento <MoveUpRight size={17} /></a></div>
                </article>
              ))}
            </div>
            <div className="product-list reveal">
              <div><span>Peças pré-moldadas</span><strong>Componentes para sustentar e organizar sua obra.</strong></div>
              <ul>{products.map((product) => <li key={product}><Check size={15} aria-hidden="true" />{product}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="gallery section section--soft" id="galeria" aria-labelledby="gallery-title">
          <div className="shell"><div className="section-heading section-heading--compact"><div><span className="eyebrow reveal">Galeria</span><h2 id="gallery-title" className="section-title reveal">Estruturas que<br />ganham forma.</h2></div><p className="reveal">Registros de montagem, execução e aplicação das soluções pré-moldadas da Blue.</p></div><Gallery /></div>
        </section>

        <section className="benefits-compact dark-section section" id="diferenciais" aria-labelledby="benefits-title">
          <div className="shell">
            <div className="benefits-compact__heading"><span className="eyebrow eyebrow--light reveal">Por que escolher a Blue</span><h2 id="benefits-title" className="section-title section-title--light reveal">Clareza para planejar.<br />Estrutura para executar.</h2></div>
            <div className="benefits-compact__grid stagger-group">
              {benefits.map(({ icon: Icon, ...benefit }, index) => <article key={benefit.title}><span>0{index + 1}</span><Icon aria-hidden="true" /><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="about-compact section" id="empresa" aria-labelledby="about-title">
          <div className="shell about-compact__grid">
            <div className="about-compact__visual reveal"><Image src="/gallery/montagem-estrutura-01.jpg" alt="Equipe trabalhando na montagem de uma estrutura pré-moldada" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <div className="about-compact__copy"><span className="eyebrow reveal">Sobre a Blue</span><h2 id="about-title" className="section-title reveal">Precisão em cada peça.<br /><span>Confiança em toda a estrutura.</span></h2><p className="lead reveal">A Blue Premoldados reúne estruturas, peças de concreto e execução especializada para atender diferentes necessidades construtivas.</p><p className="reveal">Atuamos na Paraíba e no Rio Grande do Norte com foco em qualidade, eficiência e atendimento próximo.</p><a className="text-link reveal" href="#galeria">Ver estruturas em obra <ArrowRight size={17} /></a></div>
          </div>
        </section>

        <section className="contact section" id="contato" aria-labelledby="contact-title">
          <div className="shell contact-grid">
            <div className="contact-copy"><span className="eyebrow reveal">Solicite um orçamento</span><h2 id="contact-title" className="section-title reveal">Vamos falar sobre<br />o seu projeto?</h2><p className="lead reveal">Envie os dados principais da obra. A equipe retornará para entender a necessidade e orientar os próximos passos.</p><a className="contact-direct reveal" href={whatsappHref()}><MessageCircle size={20} /><span><small>Atendimento direto</small><strong>Conversar pelo WhatsApp</strong></span><ArrowUpRight size={18} /></a></div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer footer--compact">
        <div className="shell">
          <div className="footer__top"><div><Logo light /><p>Construções e soluções pré-moldadas para projetos na Paraíba e no Rio Grande do Norte.</p></div><nav aria-label="Links do rodapé">{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><div className="footer__contact"><span>Blue Premoldados Ltda.</span><strong>CNPJ {siteConfig.cnpj}</strong><a href={whatsappHref()}><MessageCircle size={18} /> Solicitar orçamento</a></div></div>
          <div className="footer__bottom"><span>Atuação: {siteConfig.region}</span><Link href="/politica-de-privacidade">Política de Privacidade</Link></div>
        </div>
      </footer>
      <a className="floating-whatsapp" href={whatsappHref()} aria-label="Solicitar orçamento pelo WhatsApp"><MessageCircle /><span>Orçamento</span></a>
    </div>
  );
}
