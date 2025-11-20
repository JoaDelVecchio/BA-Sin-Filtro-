import HeroArticle from "@/components/top5/HeroArticle";
import ArticleListItem from "@/components/top5/ArticleListItem";
import { GridArticle } from "@/lib/types";

type Top5GridProps = {
  top5: GridArticle[];
  label?: string;
};

const Top5Grid = ({ top5, label }: Top5GridProps) => {
  if (!top5?.length) {
    return null;
  }

  const [hero, ...rest] = top5;

  return (
    <section className="section-shell mt-4 py-6">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)]">
        <HeroArticle article={hero} label={label} />
        <aside className="flex flex-col gap-2">
          <ol className="flex flex-col gap-2">
            {rest.map((article, index) => (
              <li key={article.id}>
                <ArticleListItem position={index + 2} article={article} />
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
};

export default Top5Grid;
