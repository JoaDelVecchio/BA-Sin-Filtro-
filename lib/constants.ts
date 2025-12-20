export type MainTopic = {
  code: string;
  label: string;
  description: string;
  slug?: string;
};

export const MAIN_TOPICS: MainTopic[] = [
  {
    code: "POLITICA",
    label: "Política",
    description:
      "Gestión pública, instituciones, seguridad y decisiones políticas que afectan al país.",
  },
  {
    code: "ECONOMIA",
    label: "Economía",
    description:
      "Inflación, mercado laboral, tarifas, subsidios y datos macro que impactan el bolsillo.",
  },
  {
    code: "SOCIEDAD",
    label: "Sociedad",
    description:
      "Impacto social de medidas, salud, educación y vida cotidiana con relevancia nacional.",
  },
];
