import { cookies } from "next/headers";
import { Empty } from "antd";
import { getRatedMovies } from "@/lib/tmdb";
import { GUEST_SESSION_COOKIE } from "@/lib/constants";
import MovieGrid from "@/components/MovieGrid";
import MoviePagination from "@/components/MoviePagination";

interface RatedResultsProps {
  page: number;
}

export default async function RatedResults({ page }: RatedResultsProps) {
  const cookieStore = await cookies();
  const guestSessionId = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

  if (!guestSessionId) {
    return (
      <Empty
        description="No guest session found. Please refresh the page."
        style={{ marginTop: 48 }}
      />
    );
  }

  const data = await getRatedMovies(guestSessionId, page);
  const movies = data.results;

  if (movies.length === 0) {
    return (
      <Empty
        description="You haven't rated any movies yet. Rate a movie from the Search tab!"
        style={{ marginTop: 48 }}
      />
    );
  }

  return (
    <>
      <MovieGrid movies={movies} />
      <MoviePagination currentPage={data.page} totalResults={data.total_results} />
    </>
  );
}
