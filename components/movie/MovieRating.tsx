"use client";

import { useTransition } from "react";
import { Rate } from "antd";

interface MovieRatingProps {
  rating: number;
  onChange: (value: number) => void;
}

export default function MovieRating({ rating, onChange }: MovieRatingProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: number) => {
    startTransition(() => {
      onChange(value);
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
