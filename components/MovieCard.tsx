import Image from "next/image";
import { Card, Tag } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Paragraph from "antd/es/typography/Paragraph";
import type { Movie } from "@/types/movie";
import { getPosterUrl } from "@/lib/tmdb";
import { formatMovieDate } from "@/utils/date";
import { truncateText } from "@/utils/truncate";
import { getPlaceholderGenres } from "@/utils/genres";
import styles from "./MovieCard.module.css";

const OVERVIEW_MAX_LENGTH = 140;

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const genres = getPlaceholderGenres();
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
          />
        </div>

        <div className={styles.details}>
          <Title level={5} className={styles.title}>
            {movie.title}
          </Title>

          <div className={styles.genres}>
            {genres.map((genre) => (
              <Tag key={genre} className={styles.genreTag}>
                {genre}
              </Tag>
            ))}
          </div>

          <Text type="secondary" className={styles.meta}>
            {genres.join(" | ")}
          </Text>

          <Paragraph className={styles.overview}>
            {truncateText(movie.overview, OVERVIEW_MAX_LENGTH)}
          </Paragraph>
        </div>
      </div>
    </Card>
  );
}
