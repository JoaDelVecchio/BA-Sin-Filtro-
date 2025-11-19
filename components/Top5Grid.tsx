import HeroArticle from "@/components/HeroArticle";
import ArticleListItem from "@/components/ArticleListItem";
import { GridArticle } from "@/lib/types";

type Top5GridProps = {
  top5: GridArticle[];
};

const Top5Grid = ({ top5 }: Top5GridProps) => {
  if (!top5?.length) {
    return null;
  }

  const [hero, ...rest] = top5;

  return (
    <section className="section-shell py-4 mt-4">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <HeroArticle article={hero} />
        <aside className="flex flex-col">
          <ol className="flex flex-col">
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
