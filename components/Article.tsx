import { GridArticle } from "@/lib/types";

const Article = ({ article }: { article: GridArticle }) => {
  return <div>{article.headline}</div>;
};
export default Article;
