export const siteConfig = {
  name: "Blue Premoldados Ltda.",
  shortName: "Blue Premoldados",
  cnpj: "65.340.996/0001-20",
  region: "Paraíba e Rio Grande do Norte",
  whatsapp: "", // Configurar no formato 5583999999999 quando o número oficial for fornecido.
  email: "", // Configurável.
  instagram: "", // Configurável.
  facebook: "", // Configurável.
  siteUrl: "https://www.bluepremoldados.com.br",
};

export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Empresa", href: "#empresa" },
  { label: "Serviços", href: "#servicos" },
  { label: "Produtos", href: "#produtos" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Contato", href: "#contato" },
];

export const whatsappHref = (message = "Olá! Gostaria de solicitar um orçamento.") =>
  siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
    : "#contato";
