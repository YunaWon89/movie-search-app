import Image from "next/image";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Paragraph from "antd/es/typography/Paragraph";
import type { Movie } from "@/types/movie";
import { getPosterUrl } from "@/lib/media";
import { formatMovieDate } from "@/utils/date";
import { truncateText } from "@/utils/truncate";
import GenreTags from "@/components/genres/GenreTags";
import MovieRatingControls from "./MovieRatingControls";
import styles from "./MovieCard.module.css";

const OVERVIEW_MAX_LENGTH = 140;

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <Card className={styles.card} variant="outlined">
      <div className={styles.content}>
        <div className={styles.posterWrapper}>
          <Image
            src={posterUrl}
            alt={`${movie.title} poster`}
            fill
            sizes="110px"
            className={styles.poster}
            priority={priority}
          />
        </div>

        <div className={styles.details}>
          <Title level={5} className={styles.title}>
            {movie.title}
          </Title>

          <Text type="secondary" className={styles.meta}>
            {formatMovieDate(movie.release_date)}
          </Text>

          <GenreTags genreIds={movie.genre_ids} />

          <Paragraph className={styles.overview}>
            {truncateText(movie.overview, OVERVIEW_MAX_LENGTH)}
          </Paragraph>
        </div>
      </div>

      <MovieRatingControls
        movieId={movie.id}
        voteAverage={movie.vote_average}
        initialUserRating={movie.rating ?? 0}
      />
    </Card>
  );
}
