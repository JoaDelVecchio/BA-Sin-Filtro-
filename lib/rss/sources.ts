import { FeedSource } from "@/lib/types";

export const FEED_SOURCES: FeedSource[] = [
  {
    id: "lanacion_outbound",
    title: "La Nación · Últimas",
    feedUrl:
      "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml",
    topic: "Política y Gobierno",
    region: "CABA",
  },
];
