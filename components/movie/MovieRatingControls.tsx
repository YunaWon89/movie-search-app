"use client";

import { useState } from "react";
import { message } from "antd";
import { rateMovieAction } from "@/lib/api";
import RatingBadge from "./RatingBadge";
import MovieRating from "./MovieRating";
import styles from "./MovieCard.module.css";

interface MovieRatingControlsProps {
  movieId: number;
  voteAverage: number;
  initialUserRating?: number;
}

export default function MovieRatingControls({
  movieId,
  voteAverage,
  initialUserRating = 0,
}: MovieRatingControlsProps) {
  const [userRating, setUserRating] = useState(initialUserRating);

  const displayedRating = userRating > 0 ? userRating : voteAverage;

  const handleChange = async (value: number) => {
    const previousRating = userRating;
    setUserRating(value);

    try {
      await rateMovieAction(movieId, value);
    } catch (error) {
      console.error(error);
      message.error("Couldn't save your rating. Please try again.");
      setUserRating(previousRating);
    }
  };

  return (
    <>
      <RatingBadge rating={displayedRating} />
      <div className={styles.ratingRow}>
        <MovieRating rating={userRating} onChange={handleChange} />
      </div>
    </>
  );
}
