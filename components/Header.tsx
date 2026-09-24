"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { navigation, whatsappHref } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
        <div className="site-header__inner shell">
          <a href="#inicio" aria-label="Blue Premoldados — início"><Logo light /></a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="header-cta" href={whatsappHref()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} /> WhatsApp</a>
          <button type="button" className="menu-button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__grid" aria-hidden="true" />
        <nav aria-label="Navegação mobile">
          {navigation.map((item, index) => <a key={item.href} href={item.href} onClick={close} tabIndex={open ? 0 : -1}><span>0{index + 1}</span> {item.label}</a>)}
        </nav>
        <a className="button button--yellow" href={whatsappHref()} target="_blank" rel="noopener noreferrer" onClick={close} tabIndex={open ? 0 : -1}><WhatsAppIcon size={19} /> Falar no WhatsApp</a>
      </div>
    </>
  );
}
