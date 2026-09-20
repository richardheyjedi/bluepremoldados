"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const items = [
  { question: "Quais tipos de construção a Blue Premoldados realiza?", answer: "A Blue Premoldados atua em projetos residenciais, comerciais e industriais, incluindo galpões, prédios e casas com soluções pré-moldadas." },
  { question: "Quais peças pré-moldadas estão disponíveis?", answer: "Trabalhamos com pilares, tesouras estruturais, contraventamentos, pisos intertravados e outras peças sob consulta. Medidas, capacidades e requisitos técnicos são avaliados para cada projeto." },
  { question: "A empresa atende toda a Paraíba e o Rio Grande do Norte?", answer: "A área de atuação informada contempla projetos na Paraíba e no Rio Grande do Norte. Consulte a equipe para confirmar a disponibilidade na sua cidade." },
  { question: "Como posso solicitar um orçamento?", answer: "Preencha o formulário desta página com seus dados, localização e tipo de projeto. Assim que o WhatsApp oficial estiver configurado, a solicitação também poderá ser enviada diretamente por ele." },
  { question: "Posso enviar meu projeto para avaliação?", answer: "Sim. Inicie o contato e informe que já possui um projeto. A equipe orientará quais arquivos e dados técnicos serão necessários para a avaliação." },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <div className="faq-list">{items.map((item, index) => { const open = openIndex === index; return <div className={`faq-item ${open ? "is-open" : ""}`} key={item.question}><h3><button type="button" aria-expanded={open} aria-controls={`faq-panel-${index}`} onClick={() => setOpenIndex(open ? null : index)}><span>{item.question}</span><Plus aria-hidden="true" /></button></h3><div id={`faq-panel-${index}`} className="faq-panel" hidden={!open}><p>{item.answer}</p></div></div>; })}</div>;
}
