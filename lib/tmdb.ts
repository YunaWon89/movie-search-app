import "server-only";
import type { MovieSearchResponse } from "@/types/movie";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

function getApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing TMDB_API_KEY environment variable. Add it to your .env.local file.");
  }
  return apiKey;
}

export async function searchMovies(query: string, page = 1): Promise<MovieSearchResponse> {
  const url = new URL(`${TMDB_BASE_URL}/search/movie`);
  url.searchParams.set("query", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies from TMDB: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<MovieSearchResponse>;
}

export function getPosterUrl(posterPath: string | null, size: "w342" | "w500" = "w342"): string {
  if (!posterPath) return "/poster-placeholder.svg";
  const imageBase = process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";
  return `${imageBase}/${size}${posterPath}`;
}
