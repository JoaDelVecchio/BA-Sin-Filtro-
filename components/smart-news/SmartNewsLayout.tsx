"use client";

import { useState, useMemo } from "react";
import { GridArticle } from "@/lib/types";
import { TOPIC_ENUM } from "@/lib/ai/schema";
import { cn } from "@/lib/utils";
import NewsFeed from "./NewsFeed";
import SmartView from "./SmartView";

interface SmartNewsLayoutProps {
  initialArticles: GridArticle[];
}

const ALL_TOPICS = ["Top", ...TOPIC_ENUM];

export default function SmartNewsLayout({ initialArticles }: SmartNewsLayoutProps) {
  const tabs = ["Top", "Política", "Economía", "Sociedad"];
  const [activeTab, setActiveTab] = useState("Top");
  const [selectedArticle, setSelectedArticle] = useState<GridArticle | null>(null);

  const filteredArticles = useMemo(() => {
    if (activeTab === "Top") {
      // For Top tab, we can show all or a mix. 
      // SmartNews often shows a mix. For now, let's show all sorted by date/importance.
      // Assuming initialArticles are already sorted by importance/date.
      return initialArticles;
    }
    return initialArticles.filter((article) => article.topic === activeTab);
  }, [activeTab, initialArticles]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header with Tabs */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto max-w-2xl">
          <div className="scrollbar-hide flex overflow-x-auto px-4 py-3">
            <div className="flex gap-2">
              {ALL_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setActiveTab(topic)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    activeTab === topic
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  )}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-0 py-4 md:px-4">
        <NewsFeed
          articles={filteredArticles}
          onArticleClick={setSelectedArticle}
        />
      </main>

      {/* SmartView Overlay */}
      {selectedArticle && (
        <SmartView
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
