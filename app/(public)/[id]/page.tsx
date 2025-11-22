import ArticlePage from "@/components/article/ArticlePage";
import { mapClusterToGridArticle } from "@/lib/utils";
import { getStoryClusters } from "@/lib/story-clusters";

type ArticlePageProps = {
  params: { id: string };
};

const ArticleRoute = async ({ params }: ArticlePageProps) => {
  const clusters = await getStoryClusters();
  const articles = clusters.map((cluster, index) =>
    mapClusterToGridArticle(cluster, index)
  );

  const { id } = await params;

  const article = articles.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="section-shell py-20 text-center text-muted-foreground">
        No pudimos encontrar esta nota.
      </div>
    );
  }

  let related = articles.filter(
    (item) => item.id !== article.id && item.topic === article.topic
  );

  if (!related.length) {
    related = articles.filter((item) => item.id !== article.id);
  }

  related = related.slice(0, 6);

  return <ArticlePage article={article} related={related} />;
};

export default ArticleRoute;
