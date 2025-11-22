import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export type ArticleContent = {
  contentHTML?: string;
  contentText?: string;
  image?: string | null;
};

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36";
const FETCH_TIMEOUT_MS = 12000;

export async function fetchArticleContent(
  url: string,
): Promise<ArticleContent | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": USER_AGENT,
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "accept-language": "es-AR,es;q=0.9,en;q=0.8",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(`[#rss] Article fetch failed (${response.status}) ${url}`);
      return null;
    }

    const html = await response.text();
    return parseArticleContent(html, url);
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      console.warn(`[#rss] Article fetch timeout ${url}`);
    } else {
      console.error(`[#rss] Article fetch error ${url}`, error);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export function parseArticleContent(
  html: string,
  url: string,
): ArticleContent | null {
  try {
    const dom = new JSDOM(html, { url });
    const doc = dom.window.document;
    const reader = new Readability(doc);
    const article = reader.parse();

    if (!article) {
      return null;
    }

    const contentHTML = article.content ?? undefined;
    const contentText = normalizeText(article.textContent ?? "");
    const image =
      extractMetaContent(doc, "meta[property='og:image']") ??
      extractMetaContent(doc, "meta[name='twitter:image']") ??
      extractMetaContent(doc, "meta[property='og:image:secure_url']") ??
      extractFirstImage(doc) ??
      null;

    return {
      contentHTML,
      contentText,
      image,
    };
  } catch (error) {
    console.error("[#rss] Article parse error", error);
    return null;
  }
}

function normalizeText(value: string) {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length ? text : undefined;
}

function extractMetaContent(doc: Document, selector: string) {
  const element = doc.querySelector(selector);
  const content = element?.getAttribute("content")?.trim();
  return content || undefined;
}

function extractFirstImage(doc: Document) {
  const img = doc.querySelector("img");
  const src = img?.getAttribute("src")?.trim();
  return src || undefined;
}
