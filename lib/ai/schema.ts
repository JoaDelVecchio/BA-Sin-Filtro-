import { ArticleAxiomType, Topic } from "@/lib/types";

export const ARTICLE_AXIOM_TYPES: ArticleAxiomType[] = [
  "whats-new",
  "why-it-matters",
  "driving-the-news",
  "big-picture",
  "by-the-numbers",
  "what-theyre-saying",
  "between-the-lines",
  "state-of-play",
  "zoom-in",
  "zoom-out",
  "what-to-watch",
  "whats-next",
  "the-other-side",
  "reality-check",
  "bottom-line",
  "go-deeper",
] as const;

export const TOPIC_ENUM: Topic[] = [
  "Política y Gobierno",
  "Economía",
  "Salud",
  "Negocios",
  "Tecnología",
  "Ciencia",
  "Educación",
];

export const STORY_CLUSTER_RESPONSE_SCHEMA = {
  name: "StoryClusterResponse",
  schema: {
    type: "object",
    properties: {
      clusters: {
        type: "array",
        minItems: 3,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            id: { type: "string", minLength: 3 },
            topic: { type: "string", enum: TOPIC_ENUM },
            region: { type: "string", enum: ["CABA", "PBA"], nullable: true },
            headline: { type: "string", minLength: 8, maxLength: 140 },
            subtitle: { type: "string", minLength: 8, maxLength: 180 },
            lede: { type: "string", minLength: 20, maxLength: 420 },
            tags: {
              type: "array",
              maxItems: 4,
              items: { type: "string", minLength: 2, maxLength: 40 },
            },
            sourceArticleIds: {
              type: "array",
              minItems: 1,
              maxItems: 3,
              items: { type: "string", minLength: 3 },
            },
            axiomBlocks: {
              type: "array",
              minItems: 3,
              maxItems: 7,
              items: {
                type: "object",
                properties: {
                  type: { type: "string", enum: ARTICLE_AXIOM_TYPES },
                  title: { type: "string", minLength: 3, maxLength: 80 },
                  body: { type: "string", minLength: 16, maxLength: 360 },
                  bullets: {
                    type: "array",
                    maxItems: 5,
                    items: { type: "string", minLength: 3, maxLength: 160 },
                  },
                },
                required: ["type", "title", "body"],
                additionalProperties: false,
              },
            },
          },
          required: [
            "id",
            "topic",
            "headline",
            "subtitle",
            "lede",
            "axiomBlocks",
            "sourceArticleIds",
          ],
          additionalProperties: false,
        },
      },
    },
    required: ["clusters"],
    additionalProperties: false,
  },
} as const;
