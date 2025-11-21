export type MainTopic = {
  code: string;
  label: string;
  description: string;
};

export const MAIN_TOPICS: MainTopic[] = [
  {
    code: "POLITICA_GOBIERNO",
    label: "Política y Gobierno",
    description:
      "Gestión pública, instituciones, seguridad y decisiones políticas que afectan al AMBA.",
  },
  {
    code: "ECONOMIA",
    label: "Economía",
    description:
      "Inflación, mercado laboral, tarifas, subsidios y datos macro que impactan el bolsillo.",
  },
  {
    code: "SALUD",
    label: "Salud",
    description:
      "Sistema sanitario, hospitales, alertas epidemiológicas y políticas de cuidado.",
  },
  {
    code: "NEGOCIOS",
    label: "Negocios",
    description:
      "Empresas, PYMES, crédito productivo, comercio y tendencias del mercado local.",
  },
  {
    code: "TECNOLOGIA",
    label: "Tecnología",
    description:
      "Innovación, digitalización de servicios, startups y adopción tecnológica regional.",
  },
  {
    code: "CIENCIA",
    label: "Ciencia",
    description:
      "Investigación, capacitación avanzada y proyectos científicos con impacto local.",
  },
  {
    code: "EDUCACION",
    label: "Educación",
    description:
      "Escuelas, universidades, paritarias docentes y reformas del sistema educativo.",
  },
];
