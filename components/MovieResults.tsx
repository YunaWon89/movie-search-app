import { cookies } from "next/headers";
import { Empty } from "antd";
import { searchMovies } from "@/lib/tmdb";
import { GUEST_SESSION_COOKIE } from "@/lib/constants";
import MovieGrid from "@/components/MovieGrid";
import MoviePagination from "@/components/MoviePagination";

interface MovieResultsProps {
  query: string;
  page: number;
}

export default async function MovieResults({ query, page }: MovieResultsProps) {
  const cookieStore = await cookies();
  const guestSessionId = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

  const data = await searchMovies(query, page, guestSessionId);
  const movies = data.results;

  if (movies.length === 0) {
    return <Empty description={`No movies found for "${query}"`} style={{ marginTop: 48 }} />;
  }

  return (
    <>
      <MovieGrid movies={movies} />
      <MoviePagination currentPage={data.page} totalResults={data.total_results} />
    </>
  );
}
