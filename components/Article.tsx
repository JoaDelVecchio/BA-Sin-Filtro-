import { GridArticle } from "@/lib/types";

const Article = ({
  article,
  isMain,
}: {
  article: GridArticle;
  isMain: boolean;
}) => {
  return <div>{article.headline}</div>;
};
export default Article;
