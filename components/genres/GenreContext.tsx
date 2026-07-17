"use client";

import { createContext, useContext } from "react";
import type { Genre } from "@/types/movie";

const GenreContext = createContext<Genre[] | undefined>(undefined);

interface GenreProviderProps {
  genres: Genre[];
  children: React.ReactNode;
}

export function GenreProvider({ genres, children }: GenreProviderProps) {
  return <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>;
}

export function useGenres(): Genre[] {
  const context = useContext(GenreContext);
  if (context === undefined) {
    throw new Error("useGenres must be used within a GenreProvider");
  }
  return context;
}

export function useGenreNames(genreIds: number[]): string[] {
  const genres = useGenres();
  return genreIds
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}
