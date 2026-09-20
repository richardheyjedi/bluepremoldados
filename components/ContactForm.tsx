"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = ["Olá! Gostaria de solicitar um orçamento.", `Nome: ${data.get("nome")}`, `Contato: ${data.get("telefone")}`, `Cidade/UF: ${data.get("cidade")} - ${data.get("estado")}`, `Projeto: ${data.get("projeto")}`, `Mensagem: ${data.get("mensagem")}`].join("\n");
    if (siteConfig.whatsapp) window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setStatus("success");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label><span>Nome *</span><input name="nome" type="text" autoComplete="name" required placeholder="Seu nome" /></label>
        <label><span>Telefone ou WhatsApp *</span><input name="telefone" type="tel" autoComplete="tel" required placeholder="(00) 00000-0000" /></label>
        <label><span>Cidade *</span><input name="cidade" type="text" autoComplete="address-level2" required placeholder="Sua cidade" /></label>
        <label><span>Estado *</span><select name="estado" required defaultValue=""><option value="" disabled>Selecione</option><option value="PB">Paraíba</option><option value="RN">Rio Grande do Norte</option><option value="Outro">Outro</option></select></label>
      </div>
      <label><span>Tipo de projeto *</span><select name="projeto" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Galpão</option><option>Prédio</option><option>Casa</option><option>Peças pré-moldadas</option><option>Piso intertravado</option><option>Outro</option></select></label>
      <label><span>Mensagem *</span><textarea name="mensagem" rows={5} required placeholder="Conte um pouco sobre sua necessidade." /></label>
      <label className="privacy-check"><input name="privacidade" type="checkbox" required /><span>Concordo com o uso dos dados para retorno desta solicitação, conforme a Política de Privacidade.</span></label>
      <button className="button button--yellow button--wide" type="submit">Solicitar orçamento <ArrowRight size={18} /></button>
      {status === "success" && <p className="form-success" role="status"><CheckCircle2 size={18} />{siteConfig.whatsapp ? "Mensagem preparada. Continue pelo WhatsApp para enviar." : "Formulário validado. Configure o número oficial do WhatsApp para ativar o envio."}</p>}
    </form>
  );
}
