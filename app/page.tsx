import Header from "@/components/Header";
import PopularNewsTabs from "@/components/PopularNewsTabs";
import Top5Grid from "@/components/Top5Grid";
import { MOCK_POPULAR_NEWS } from "@/lib/mocks";

export default async function Home() {
  return (
    <div className="min-h-screen ">
      <Header />
      <PopularNewsTabs popularNews={MOCK_POPULAR_NEWS} />
      {/* <Top5Grid /> */}
      {/* ARTICLES */}
    </div>
  );
}
