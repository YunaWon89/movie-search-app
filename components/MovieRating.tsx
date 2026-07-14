"use client";

import { useState, useTransition } from "react";
import { Rate, message } from "antd";
import { rateMovieAction } from "@/lib/actions";

interface MovieRatingProps {
  movieId: number;
  initialRating?: number;
}

export default function MovieRating({ movieId, initialRating = 0 }: MovieRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: number) => {
    const previousRating = rating;
    setRating(value);

    startTransition(async () => {
      try {
        await rateMovieAction(movieId, value);
      } catch (error) {
        console.error(error);
        message.error("Couldn't save your rating. Please try again.");
        setRating(previousRating);
      }
    });
  };

  return (
    <Rate
      allowHalf
      count={10}
      value={rating}
      disabled={isPending}
      onChange={handleChange}
      style={{ fontSize: 14 }}
    />
  );
}
