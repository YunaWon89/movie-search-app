import { Row, Col } from "antd";
import type { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <Row gutter={[16, 16]}>
      {movies.map((movie, index) => (
        <Col key={movie.id} xs={24} md={12}>
          <MovieCard movie={movie} priority={index === 0} />
        </Col>
      ))}
    </Row>
  );
}
