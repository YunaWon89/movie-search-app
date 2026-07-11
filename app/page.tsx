import { Alert } from "antd";
import Title from "antd/es/typography/Title";
import { searchMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import type { Movie } from "@/types/movie";

const SEARCH_KEYWORD = "return";

export default async function HomePage() {
  let movies: Movie[] = [];
  let errorMessage: string | null = null;

  try {
    const data = await searchMovies(SEARCH_KEYWORD);
    movies = data.results;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Please try again later.";
  }

  return (
    <main className="page-container">
      <Title level={3}>Movie Search</Title>

      {errorMessage ? (
        <Alert type="error" message="Couldn't load movies" description={errorMessage} showIcon />
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}
