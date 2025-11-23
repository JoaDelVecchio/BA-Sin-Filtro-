import crypto from "node:crypto";

import { FeedArticle } from "@/lib/types";

const MAX_ARTICLES = 60;
const MAX_CONTENT_CHARS = 20000;

type MessageContent = { type: "input_text"; text: string };
export type PromptMessage = {
  role: "system" | "user";
  content: MessageContent[];
};

export type PromptArticlePayload = {
  id: string;
  source: string;
  title?: string;
  summary?: string;
  content?: string;
  url: string;
  topic: string;
  region?: string;
  publishedAt?: string;
};

export type PromptArticle = {
  payload: PromptArticlePayload;
  original: FeedArticle;
};

export type StoryClusterPrompt = {
  messages: PromptMessage[];
  promptArticles: PromptArticle[];
};

const SYSTEM_PROMPT = `You are the duty editor at BA Sin Filtro.
Write in Argentine Spanish using Smart Brevity: sharp, neutral voice, max context.
Every fact must be grounded on the supplied articles (do not invent details).
Return only JSON that follows the provided schema. Do not wrap it in markdown.`;

const AXIOM_RULES = `Axiom rules:
- Always include the types "whats-new" and "why-it-matters" once.
- Include exactly one of "driving-the-news" or "big-picture".
- Use "by-the-numbers" when strong figures exist.
- Use "what-theyre-saying" when there is a quote or statement.
- Use "between-the-lines" for hidden context.
- Use "what-to-watch" or "whats-next" for future milestones.
- Only use "the-other-side", "reality-check", "bottom-line" or "go-deeper" when meaningful new info exists.
- Never repeat an axiom type within the same cluster.
- Each axiom body is 2-4 sentences; optional 0-7 bullets.`;

export function buildStoryClusterPrompt(
  articles: FeedArticle[]
): StoryClusterPrompt {
  const trimmed = articles.slice(0, MAX_ARTICLES);
  const promptArticles = trimmed.map((article, index) => {
    const payload: PromptArticlePayload = {
      id: createArticleId(article, index),
      source: article.source,
      title: safeText(article.title, 240),
      summary: safeText(article.description ?? article.contentText, 320),
      content: safeText(article.contentText, MAX_CONTENT_CHARS),
      url: article.url ?? "",
      topic: article.topic,
      region: article.region,
      publishedAt: article.publishedAt,
    };

    return { payload, original: article };
  });

  const datasetJson = JSON.stringify(
    promptArticles.map(({ payload }) => payload),
    null,
    2
  );

  const userPrompt = `Hoy es ${new Date().toISOString()}.
Analiza las notas JSON (con id, titulo, resumen, contenido y metadata) para crear story clusters para lectores del AMBA.

IMPORTANT: Para cada cluster, **analiza cuidadosamente el contenido** y asigna el topic más apropiado de esta lista:
- "Política y Gobierno" - gestión pública, instituciones, decisiones políticas
- "Economía" - inflación, tarifas, subsidios, datos macro
- "Salud" - sistema sanitario, hospitales, políticas de salud
- "Negocios" - empresas, PYMES, comercio
- "Tecnología" - innovación, digitalización, startups
- "Ciencia" - investigación, proyectos científicos
- "Educación" - escuelas, universidades, sistema educativo
- "CABA" - obras, servicios, gobierno porteño
- "Buenos Aires (PBA)" - medidas provinciales, intendencias, conurbano

El topic debe reflejar el TEMA PRINCIPAL del cluster, no solo la ubicación geográfica.
Si una nota trata sobre economía EN CABA, el topic es "Economía" y region es "CABA".
Si una nota trata sobre decisiones del gobierno DE CABA, el topic es "CABA".

Genera 20 clusters (no menos, máximo permitido por el esquema) cubriendo diversos topics y ángulos. Ajusta el detalle para no pasarte de largo: sé conciso y usa solo lo esencial de cada nota.
Cada cluster debe centrarse en un ángulo claro y citar 1-3 ids de notas relevantes en "sourceArticleIds".

Requisitos:
- Headline breve y subtitulo de contexto.
- Lede en 2-4 oraciones con contexto y datos clave.
- 3 a 9 axioms siguiendo las reglas, cada uno con cuerpo detallado (2-4 oraciones) y bullets cuando aporten detalle (lista vacía si no hay).
- Incluye siempre region (usa null si no aplica) y tags (lista vacía si no hay entidades).
- region solo CABA o PBA cuando el foco geográfico sea claro.
- Todo debe estar en español.

${AXIOM_RULES}

Dataset:
${datasetJson}`;

  const messages: PromptMessage[] = [
    {
      role: "system",
      content: [{ type: "input_text", text: SYSTEM_PROMPT }],
    },
    { role: "user", content: [{ type: "input_text", text: userPrompt }] },
  ];

  return { messages, promptArticles };
}

function safeText(value?: string | null, maxLength = 800) {
  if (!value) return undefined;
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized.length) return undefined;
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength)}...`;
}

function createArticleId(article: FeedArticle, index: number) {
  const basis = article.url ?? `${article.source}-${article.title ?? index}`;
  return crypto.createHash("md5").update(`${index}-${basis}`).digest("hex");
}
