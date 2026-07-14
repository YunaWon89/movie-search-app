import { Suspense } from "react";
import { Spin } from "antd";
import { DEFAULT_SEARCH_QUERY } from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import MovieResults from "@/components/MovieResults";
import PageHeader from "@/components/PageHeader";

interface HomePageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const query = params.query?.trim() || DEFAULT_SEARCH_QUERY;
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  return (
    <main className="page-container">
      <PageHeader />

      <div style={{ maxWidth: 700, margin: "24px auto" }}>
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
