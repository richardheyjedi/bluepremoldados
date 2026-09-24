export const siteConfig = {
  name: "Blue Premoldados Ltda.",
  shortName: "Blue Premoldados",
  cnpj: "65.340.996/0001-20",
  region: "Paraíba e Rio Grande do Norte",
  whatsapp: "5584982007766",
  email: "", // Configurável.
  instagram: "", // Configurável.
  facebook: "", // Configurável.
  siteUrl: "https://www.bluepremoldados.com.br",
};

export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Empresa", href: "#empresa" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

export const whatsappHref = (message = "Olá! Gostaria de solicitar um orçamento.") =>
  siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
    : "#contato";
