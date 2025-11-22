import Parser from "rss-parser";

import { FeedArticle, FeedSource } from "@/lib/types";

type ParserCustomItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  description?: string;
  content?: string;
  contentSnippet?: string;
  summary?: string;
  enclosure?: { url?: string };
  contentEncoded?: string;
  mediaContent?: { url?: string } | { $?: { url?: string } };
  mediaThumbnail?: { url?: string } | { $?: { url?: string } };
};

const parser = new Parser<unknown, ParserCustomItem>({
  timeout: 10000,
  customFields: {
    item: [
      ["content:encoded", "contentEncoded"],
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
    ],
  },
});

export async function fetchFeedArticles(
  source: FeedSource,
): Promise<FeedArticle[]> {
  try {
    const feed = await parser.parseURL(source.feedUrl);
    const items = feed.items ?? [];

    return items
      .map((item) => normalizeItem(item, source))
      .filter((article): article is FeedArticle => Boolean(article));
  } catch (error) {
    console.error(`[rss] Failed to fetch ${source.id}`, error);
    return [];
  }
}

function normalizeItem(
  item: ParserCustomItem,
  source: FeedSource,
): FeedArticle | null {
  const url = item.link?.trim();
  if (!url) {
    return null;
  }

  const contentHTML = item.contentEncoded ?? item.content ?? undefined;
  const contentText = htmlToPlainText(contentHTML);

  return {
    feedId: source.id,
    topic: source.topic,
    region: source.region,
    source: source.title,
    title: item.title?.trim(),
    description: chooseText(item.description, item.summary, item.contentSnippet),
    url,
    image: pickImage(item),
    publishedAt: pickDate(item.isoDate, item.pubDate),
    contentHTML,
    contentText,
  };
}

function pickImage(item: ParserCustomItem): string | null | undefined {
  const enclosure = item.enclosure?.url;
  const mediaContent = getMediaUrl(item.mediaContent);
  const mediaThumb = getMediaUrl(item.mediaThumbnail);
  const fromHtml = extractImageFromHtml(item.contentEncoded ?? item.content);

  return enclosure ?? mediaContent ?? mediaThumb ?? fromHtml ?? null;
}

function getMediaUrl(
  value: ParserCustomItem["mediaContent"],
): string | undefined {
  if (!value) return undefined;
  if (typeof (value as { url?: string }).url === "string") {
    return (value as { url?: string }).url;
  }

  const nested = (value as { $?: { url?: string } }).$?.url;
  return nested ?? undefined;
}

function pickDate(...dates: (string | undefined)[]) {
  for (const candidate of dates) {
    if (!candidate) continue;
    const iso = new Date(candidate);
    if (!Number.isNaN(iso.getTime())) {
      return iso.toISOString();
    }
  }
  return undefined;
}

function chooseText(...texts: (string | undefined)[]) {
  for (const text of texts) {
    if (text && text.trim().length > 0) {
      return text.trim();
    }
  }
  return undefined;
}

const IMG_REGEX = /<img\s+[^>]*src=["']([^"']+)["']/i;

function extractImageFromHtml(html?: string) {
  if (!html) return undefined;
  const match = html.match(IMG_REGEX);
  return match?.[1];
}

function htmlToPlainText(html?: string) {
  if (!html) return undefined;

  const withoutNoise = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ");
  const plain = withoutNoise
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ");
  const normalized = plain.replace(/\s+/g, " ").trim();
  return normalized.length ? normalized : undefined;
}
