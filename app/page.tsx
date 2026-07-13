import { Suspense } from "react";
import { Spin } from "antd";
import Title from "antd/es/typography/Title";
import { DEFAULT_SEARCH_QUERY } from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import MovieResults from "@/components/MovieResults";

interface HomePageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const query = params.query?.trim() || DEFAULT_SEARCH_QUERY;
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  return (
    <main className="page-container">
      <Title level={3} style={{ textAlign: "center" }}>
        Movie Search
      </Title>

      <div style={{ maxWidth: 700, margin: "0 auto 24px" }}>
        <SearchBar />
      </div>

      <Suspense
        key={`${query}-${page}`}
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "40vh",
            }}
          >
            <Spin size="large" description="Loading movies..." />
          </div>
        }
      >
        <MovieResults query={query} page={page} />
      </Suspense>
    </main>
  );
}
