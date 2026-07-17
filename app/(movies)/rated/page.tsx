import { Suspense } from "react";
import { cookies } from "next/headers";
import { Spin, Empty } from "antd";
import { getRatedMovies } from "@/lib/api";
import { guestSessionCookieName } from "@/lib/constants";
import MovieGrid from "@/components/movie/MovieGrid";
import MoviePagination from "@/components/movie/MoviePagination";

interface RatedPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function RatedPage({ searchParams }: RatedPageProps) {
  const params = await searchParams;
  const page = Number(params.page) > 0 ? Number(params.page) : 1;

  return (
    <main className="page-container">
      <Suspense key={page} fallback={<ResultsSpinner />}>
        <RatedResults page={page} />
      </Suspense>
    </main>
  );
}

async function RatedResults({ page }: { page: number }) {
  const cookieStore = await cookies();
  const guestSessionId = cookieStore.get(guestSessionCookieName)?.value;

  if (!guestSessionId) {
    return (
      <Empty
        description="No guest session found. Please refresh the page."
        style={{ marginTop: 48 }}
      />
    );
  }

  let data;
  try {
    data = await getRatedMovies(guestSessionId, page);
  } catch {
    return (
      <Empty
        description="Your session has expired. Please refresh the page to start a new one."
        style={{ marginTop: 48 }}
      />
    );
  }

  if (data.results.length === 0) {
    return (
      <Empty
        description="You haven't rated any movies yet. Rate a movie from the Search tab!"
        style={{ marginTop: 48 }}
      />
    );
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
      <Spin size="large" description="Loading rated movies..." />
    </div>
  );
}
