import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Política de Privacidade | Blue Premoldados" };

export default function PrivacyPage() {
  return <main className="legal-page"><div className="legal-page__header"><Link href="/" aria-label="Voltar para a página inicial"><Logo light /></Link></div><article><span className="eyebrow">Privacidade</span><h1>Política de Privacidade</h1><p>Esta página descreve como os dados enviados pelo formulário de contato da Blue Premoldados serão utilizados.</p><h2>Dados coletados</h2><p>O formulário solicita nome, telefone ou WhatsApp, cidade, estado, tipo de projeto e mensagem. Esses dados são fornecidos voluntariamente pelo visitante.</p><h2>Finalidade</h2><p>As informações são usadas exclusivamente para responder à solicitação, entender a necessidade apresentada e orientar o atendimento comercial ou técnico.</p><h2>Compartilhamento e armazenamento</h2><p>Os dados não devem ser comercializados. Os detalhes sobre canal de armazenamento, prazo de retenção e responsável pelo tratamento precisam ser confirmados pela empresa antes da publicação definitiva.</p><h2>Contato</h2><p>O canal oficial para solicitações relacionadas à privacidade será incluído assim que a empresa fornecer o telefone ou e-mail responsável.</p><Link className="button button--navy" href="/">Voltar para o site <ArrowRightIcon /></Link></article></main>;
}

function ArrowRightIcon() { return <span aria-hidden="true">→</span>; }
