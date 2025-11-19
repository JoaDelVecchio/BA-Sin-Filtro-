import ArticlePage from "@/components/article/ArticlePage";
import { MOCK_CLUSTERS } from "@/lib/mocks";
import { mapClusterToGridArticle } from "@/lib/utils";

type ArticlePageProps = {
  params: { id: string };
};

const ArticleRoute = async ({ params }: ArticlePageProps) => {
  const articles = MOCK_CLUSTERS.map((cluster, index) =>
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

  return <ArticlePage article={article} />;
};

export default ArticleRoute;
