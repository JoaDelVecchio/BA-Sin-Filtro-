import { FeedSource } from "@/lib/types";

export const FEED_SOURCES: FeedSource[] = [
  {
    id: "lanacion_outbound",
    title: "La Nación",
    feedUrl:
      "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml",
    topic: "Política",
    region: "CABA",
  },
  {
    id: "clarin_lo_ultimo",
    title: "Clarín",
    feedUrl: "https://www.clarin.com/rss/lo-ultimo/",
    topic: "Política",
    region: "CABA",
  },
  {
    id: "infobae_argentina",
    title: "Infobae",
    feedUrl: "https://www.infobae.com/argentina-rss.xml",
    topic: "Política",
    region: "CABA",
  },
  {
    id: "cronista_news",
    title: "El Cronista",
    feedUrl: "https://www.cronista.com/files/rss/news.xml",
    topic: "Economía",
    region: "CABA",
  },
];
