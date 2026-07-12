import { Alert } from "antd";
import Title from "antd/es/typography/Title";
import { searchMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

const SEARCH_KEYWORD = "return";

export default async function HomePage() {
  const data = await searchMovies(SEARCH_KEYWORD);
  const movies = data.results;

  if (movies.length === 0) {
    return (
      <main className="page-container">
        <Title level={3}>Movie Search</Title>
        <Alert
          type="info"
          showIcon
          message="No movies found"
          description="Try a different search keyword."
        />
      </main>
    );
  }

  return (
    <main className="page-container">
      <Title level={3}>Movie Search</Title>
      <MovieGrid movies={movies} />
    </main>
  );
}
