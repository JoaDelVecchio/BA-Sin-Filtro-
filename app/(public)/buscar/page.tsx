import SearchResultsClient from "@/components/search/SearchResultsClient";
import { getStoryClusters } from "@/lib/story-clusters";
import { mapClusterToGridArticle } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SearchPage = async () => {
  const clusters = await getStoryClusters();
  const articles = clusters.map(mapClusterToGridArticle);

  return (
    <div className="section-shell py-12">
      <SearchResultsClient articles={articles} />
    </div>
  );
};

export default SearchPage;
