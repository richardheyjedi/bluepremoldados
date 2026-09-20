"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Blocks, Building2, Check, ClipboardCheck, Factory, Handshake, HardHat, Home, Camera, Share2, MapPin, MessageCircle, MoveUpRight, PackageCheck, Ruler, ShieldCheck, Timer, Warehouse } from "lucide-react";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { ProductScroller } from "./ProductScroller";
import { ContactForm } from "./ContactForm";
import { Gallery } from "./Gallery";
import { Faq } from "./Faq";
import { navigation, siteConfig, whatsappHref } from "@/lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  { title: "Galpões", text: "Soluções estruturais para galpões comerciais, industriais, logísticos e agrícolas.", image: "/images/service-galpoes.webp", icon: Warehouse, alt: "Estrutura editorial de galpão pré-moldado em construção" },
  { title: "Prédios", text: "Estruturas pré-moldadas para projetos que exigem organização, precisão e agilidade construtiva.", image: "/images/service-predios.webp", icon: Building2, alt: "Estrutura editorial de prédio pré-moldado em construção" },
  { title: "Casas", text: "Soluções para construções residenciais com estruturas resistentes e processos mais eficientes.", image: "/images/service-casas.webp", icon: Home, alt: "Estrutura editorial de residência pré-moldada em construção" },
];

const differentials = [
  { title: "Soluções personalizadas", text: "Cada necessidade orienta uma composição estrutural adequada ao projeto.", icon: Ruler },
  { title: "Estruturas resistentes", text: "Peças e sistemas concebidos para formar uma base sólida e confiável.", icon: ShieldCheck },
  { title: "Agilidade construtiva", text: "Processos organizados para favorecer ritmo, precisão e eficiência na obra.", icon: Timer },
  { title: "Atendimento regional", text: "Atuação voltada a projetos na Paraíba e no Rio Grande do Norte.", icon: MapPin },
];

const steps = [
  { number: "01", title: "Entendimento da necessidade", text: "Conhecemos o contexto, o tipo de projeto e o local da obra.", icon: Handshake },
  { number: "02", title: "Planejamento da solução", text: "Organizamos a solução e os componentes necessários para avançar.", icon: ClipboardCheck },
  { number: "03", title: "Produção das peças", text: "Os elementos são preparados conforme as definições do projeto.", icon: Factory },
  { number: "04", title: "Entrega ou execução", text: "A solução segue para entrega ou para a etapa de execução combinada.", icon: PackageCheck },
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
        .from(".hero-structure-line", { scaleX: 0, transformOrigin: "left center", duration: 0.8, stagger: 0.08 })
        .from(".hero-kicker", { y: 18, autoAlpha: 0, duration: 0.5 }, "-=0.35")
        .from(".hero-title-line", { yPercent: 110, duration: 0.85, stagger: 0.1 }, "-=0.2")
        .from(".hero-copy", { y: 22, autoAlpha: 0, duration: 0.55 }, "-=0.35")
        .from(".hero-actions", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.3")
        .from(".hero-aside", { x: 40, autoAlpha: 0, duration: 0.7 }, "-=0.55");

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, { y: 34, autoAlpha: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".stagger-group").forEach((group) => {
        gsap.from(group.children, { y: 36, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: group, start: "top 82%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".mask-reveal").forEach((element) => {
        gsap.from(element, { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power3.inOut", scrollTrigger: { trigger: element, start: "top 84%", once: true } });
      });
      if (desktop) {
        gsap.to(".company-visual img", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".company-visual", start: "top bottom", end: "bottom top", scrub: 0.8 } });
      }
      gsap.fromTo(".process-line__fill", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: ".process-grid", start: "top 70%", end: "bottom 65%", scrub: 0.5 } });
      gsap.from(".process-card__connector", { scaleX: 0, transformOrigin: "left", stagger: 0.15, scrollTrigger: { trigger: ".process-grid", start: "top 75%", end: "bottom 70%", scrub: 0.5 } });
      gsap.to(".scroll-progress__bar", { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });
    });
    return () => mm.revert();
  }, { scope: rootRef });

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress__bar" /></div>
      <Header />
      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <Image src="/images/hero-structure.webp" alt="Estrutura editorial de concreto pré-moldado em montagem" fill priority sizes="100vw" className="hero__image" />
          <div className="hero__overlay" />
          <div className="hero__blueprint" aria-hidden="true"><i className="hero-structure-line" /><i className="hero-structure-line" /><i className="hero-structure-line" /><i className="hero-structure-line" /></div>
          <div className="hero__content shell">
            <div className="hero__copy-column">
              <span className="hero-kicker hero-animate"><Blocks size={17} /> Construção e peças pré-moldadas</span>
              <h1 id="hero-title"><span className="hero-title-mask"><span className="hero-title-line">Estruturas fortes.</span></span><span className="hero-title-mask"><span className="hero-title-line hero-title-line--accent">Obras que avançam.</span></span></h1>
              <p className="hero-copy hero-animate">Construções e soluções pré-moldadas para projetos residenciais, comerciais e industriais na Paraíba e no Rio Grande do Norte.</p>
              <div className="hero-actions hero-animate"><a className="button button--yellow" href={whatsappHref()}>Solicitar orçamento <ArrowUpRight size={18} /></a><a className="button button--ghost" href="#servicos">Conhecer soluções <ArrowDown size={18} /></a></div>
            </div>
            <aside className="hero-aside hero-animate" aria-label="Área de atuação"><span>Atuação regional</span><strong>PB <i /> RN</strong><p>Soluções que conectam planejamento, produção e execução.</p></aside>
          </div>
          <a href="#empresa" className="hero__scroll" aria-label="Rolar para conhecer a empresa"><span>Explore</span><i /></a>
        </section>

        <section className="company section" id="empresa" aria-labelledby="company-title">
          <div className="shell company-grid">
            <div className="company-copy"><span className="eyebrow reveal">A Blue</span><h2 id="company-title" className="section-title reveal">Precisão em cada peça.<br /><span>Segurança em toda a estrutura.</span></h2><p className="lead reveal">A Blue Premoldados oferece soluções para construções residenciais, comerciais e industriais, reunindo estruturas pré-moldadas, peças de concreto e execução especializada.</p><p className="reveal">Atendemos projetos na Paraíba e no Rio Grande do Norte com foco em qualidade, eficiência e confiança.</p><a className="text-link reveal" href="#processo">Conheça nosso processo <ArrowRight size={17} /></a></div>
            <div className="company-visual mask-reveal"><Image src="/images/service-galpoes.webp" alt="Estrutura pré-moldada usada como imagem editorial" fill sizes="(max-width: 768px) 100vw, 50vw" /><div className="company-visual__frame" aria-hidden="true"><span>A—01</span><span>Estrutura modular</span><i /><i /><i /></div><div className="company-visual__tag"><Check size={16} /> Engenharia em movimento</div></div>
          </div>
        </section>

        <section className="services section section--soft" id="servicos" aria-labelledby="services-title">
          <div className="shell"><div className="section-heading"><div><span className="eyebrow reveal">Serviços</span><h2 id="services-title" className="section-title reveal">Construímos projetos<br />preparados para durar.</h2></div><p className="reveal">Da escala residencial aos grandes vãos, soluções que organizam a obra e constroem confiança.</p></div><div className="services-grid stagger-group">{services.map(({ icon: Icon, ...service }, index) => <article className="service-card" key={service.title}><div className="service-card__media"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 100vw, 33vw" /><span>0{index + 1}</span></div><div className="service-card__body"><Icon aria-hidden="true" /><h3>{service.title}</h3><p>{service.text}</p><a href="#contato" aria-label={`Solicitar orçamento para ${service.title}`}>Falar sobre meu projeto <MoveUpRight size={17} /></a></div></article>)}</div></div>
        </section>

        <ProductScroller />

        <section className="differentials section" aria-labelledby="differentials-title">
          <div className="shell"><div className="section-heading"><div><span className="eyebrow reveal">Diferenciais</span><h2 id="differentials-title" className="section-title reveal">Soluções pensadas<br />do projeto à execução.</h2></div></div><div className="differentials-grid stagger-group">{differentials.map(({ icon: Icon, ...item }, index) => <article className="differential-card" key={item.title}><div className="differential-card__number">0{index + 1}</div><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div>
        </section>

        <section className="process section dark-section" id="processo" aria-labelledby="process-title">
          <div className="shell"><span className="eyebrow eyebrow--light reveal">Processo</span><h2 id="process-title" className="section-title section-title--light reveal">Como transformamos o seu<br />projeto em estrutura.</h2><div className="process-grid"><div className="process-line" aria-hidden="true"><span className="process-line__fill" /></div>{steps.map(({ icon: Icon, ...step }) => <article className="process-card reveal" key={step.number}><div className="process-card__node"><Icon size={22} /></div><div className="process-card__connector" aria-hidden="true" /><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div>
        </section>

        <section className="coverage section" id="atuacao" aria-labelledby="coverage-title">
          <div className="shell coverage-grid"><div className="coverage-copy"><span className="eyebrow reveal">Área de atuação</span><h2 id="coverage-title" className="section-title reveal">Presentes onde o seu<br />projeto precisa acontecer.</h2><p className="lead reveal">Atendemos projetos em toda a Paraíba e no Rio Grande do Norte.</p><a className="button button--navy reveal" href="#contato">Consultar atendimento na minha cidade <ArrowRight size={18} /></a></div><div className="coverage-map reveal" role="img" aria-label="Representação gráfica da Paraíba e do Rio Grande do Norte"><div className="map-grid" aria-hidden="true" /><svg viewBox="0 0 620 410" aria-hidden="true"><path className="state state--rn" d="M202 64 276 44 360 50 431 72 526 83 562 121 529 159 446 164 390 147 319 157 260 138 213 108Z" /><path className="state state--pb" d="M115 214 209 180 297 177 382 191 474 181 540 205 518 253 441 270 369 258 295 278 218 260 143 271 91 245Z" /><circle cx="499" cy="117" r="5" /><circle cx="481" cy="225" r="5" /></svg><span className="map-label map-label--rn">Rio Grande do Norte <i>RN</i></span><span className="map-label map-label--pb">Paraíba <i>PB</i></span><div className="map-legend"><span><i /> Área de atendimento</span><small>Representação ilustrativa</small></div></div></div>
        </section>

        <section className="gallery section section--soft" aria-labelledby="gallery-title"><div className="shell"><div className="section-heading"><div><span className="eyebrow reveal">Galeria</span><h2 id="gallery-title" className="section-title reveal">Estruturas que<br />ganham forma.</h2></div><p className="reveal">Registros de montagem, execução e aplicação das soluções pré-moldadas da Blue.</p></div><Gallery /></div></section>

        <section className="cta-section" aria-labelledby="cta-title"><div className="cta-section__geometry" aria-hidden="true"><i /><i /><i /></div><div className="shell cta-section__inner"><span className="eyebrow eyebrow--light reveal">Comece seu projeto</span><h2 id="cta-title" className="reveal">Vamos construir uma base sólida para o seu projeto?</h2><p className="reveal">Fale com a Blue Premoldados, apresente sua necessidade e solicite um orçamento.</p><div className="cta-section__actions reveal"><a className="button button--yellow" href={whatsappHref()}>Solicitar orçamento pelo WhatsApp <MessageCircle size={18} /></a><a className="button button--ghost" href="#contato">Enviar informações do projeto <ArrowDown size={18} /></a></div><small className="reveal">O número oficial do WhatsApp será ativado após configuração.</small></div></section>

        <section className="contact section" id="contato" aria-labelledby="contact-title"><div className="shell contact-grid"><div className="contact-copy"><span className="eyebrow reveal">Contato</span><h2 id="contact-title" className="section-title reveal">Conte sobre o<br />seu próximo projeto.</h2><p className="lead reveal">Preencha as informações ao lado. Quanto mais contexto você enviar, melhor poderemos direcionar o primeiro atendimento.</p><div className="contact-note reveal"><HardHat size={25} /><div><strong>Atendimento técnico e regional</strong><span>Paraíba e Rio Grande do Norte</span></div></div></div><ContactForm /></div></section>

        <section className="faq section section--soft" aria-labelledby="faq-title"><div className="shell faq-grid"><div><span className="eyebrow reveal">Dúvidas frequentes</span><h2 id="faq-title" className="section-title reveal">Informação clara<br />para decidir melhor.</h2></div><Faq /></div></section>
      </main>

      <footer className="footer"><div className="shell"><div className="footer__top"><div><Logo light /><p>Construções e soluções pré-moldadas para projetos na Paraíba e no Rio Grande do Norte.</p></div><nav aria-label="Links do rodapé">{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><div className="footer__contact"><span>Fale com a Blue</span><a href={whatsappHref()}><MessageCircle size={18} /> WhatsApp <small>configurável</small></a><div className="footer__social"><a href={siteConfig.instagram || "#contato"} aria-label="Instagram — perfil configurável"><Camera /></a><a href={siteConfig.facebook || "#contato"} aria-label="Rede social — perfil configurável"><Share2 /></a></div></div></div><div className="footer__bottom"><span>Blue Premoldados Ltda. · CNPJ {siteConfig.cnpj}</span><span>Atuação: {siteConfig.region}</span><Link href="/politica-de-privacidade">Política de Privacidade</Link></div></div></footer>
      <a className="floating-whatsapp" href={whatsappHref()} aria-label="Solicitar orçamento pelo WhatsApp"><MessageCircle /><span>Orçamento</span></a>
    </div>
  );
}
