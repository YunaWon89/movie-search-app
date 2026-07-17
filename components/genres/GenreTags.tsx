"use client";

import { Tag } from "antd";
import { useGenreNames } from "./GenreContext";
import styles from "./GenreTags.module.css";

interface GenreTagsProps {
  genreIds: number[];
}

export default function GenreTags({ genreIds }: GenreTagsProps) {
  const genreNames = useGenreNames(genreIds);

  if (genreNames.length === 0) {
    return null;
  }

  return (
    <div className={styles.genres}>
      {genreNames.map((name) => (
        <Tag key={name} className={styles.genreTag}>
          {name}
        </Tag>
      ))}
    </div>
  );
}
