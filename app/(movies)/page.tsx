import { Suspense } from "react";
import { cookies } from "next/headers";
import { Spin, Empty } from "antd";
import { searchMovies } from "@/lib/api";
import { defaultSearchQuery } from "@/lib/constants";
import { guestSessionCookieName } from "@/lib/constants";
import SearchBar from "@/components/search/SearchBar";
import MovieGrid from "@/components/movie/MovieGrid";
import MoviePagination from "@/components/movie/MoviePagination";

interface HomePageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const query = params.query?.trim() || defaultSearchQuery;
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  return (
    <main className="page-container">
      <div style={{ maxWidth: 700, margin: "24px auto" }}>
        <SearchBar />
      </div>

      <Suspense key={`${query}-${page}`} fallback={<ResultsSpinner />}>
        <SearchResults query={query} page={page} />
      </Suspense>
    </main>
  );
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const cookieStore = await cookies();
  const guestSessionId = cookieStore.get(guestSessionCookieName)?.value;

  const data = await searchMovies(query, page, guestSessionId);

  if (data.results.length === 0) {
    return <Empty description={`No movies found for "${query}"`} style={{ marginTop: 48 }} />;
  }

  return (
    <>
      <MovieGrid movies={data.results} />
      <MoviePagination currentPage={data.page} totalResults={data.total_results} />
    </>
  );
}

function ResultsSpinner() {
  return (
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
  );
}
