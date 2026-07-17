"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type {
  MovieSearchResponse,
  Genre,
  GenresResponse,
  GuestSessionResponse,
  RatedMoviesResponse,
} from "@/types/movie";
import { guestSessionCookieName } from "@/lib/constants";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

function getApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing TMDB_API_KEY environment variable. Add it to your .env.local file.");
  }
  return apiKey;
}

export async function getRatedMovies(
  guestSessionId: string,
  page = 1,
): Promise<RatedMoviesResponse> {
  const url = new URL(`${TMDB_BASE_URL}/guest_session/${guestSessionId}/rated/movies`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("language", "en-US");
  url.searchParams.set("sort_by", "created_at.desc");

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${getApiKey()}`, Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch rated movies from TMDB: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<RatedMoviesResponse>;
}

async function getRatedMoviesMap(guestSessionId: string): Promise<Map<number, number>> {
  const ratingsMap = new Map<number, number>();

  try {
    let page = 1;
    let totalPages = 1;

    do {
      const data = await getRatedMovies(guestSessionId, page);
      data.results.forEach((movie) => ratingsMap.set(movie.id, movie.rating));
      totalPages = data.total_pages;
      page += 1;
    } while (page <= totalPages && page <= 5);
  } catch {
    // Guest session may be invalid/expired — degrade gracefully.
  }

  return ratingsMap;
}

async function attachRatings(
  data: MovieSearchResponse,
  guestSessionId: string,
): Promise<MovieSearchResponse> {
  const ratingsMap = await getRatedMoviesMap(guestSessionId);
  const results = data.results.map((movie) => ({ ...movie, rating: ratingsMap.get(movie.id) }));
  return { ...data, results };
}

export async function searchMovies(
  query: string,
  page = 1,
  guestSessionId?: string,
): Promise<MovieSearchResponse> {
  const url = new URL(`${TMDB_BASE_URL}/search/movie`);
  url.searchParams.set("query", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${getApiKey()}`, Accept: "application/json" },
    cache: guestSessionId ? "no-store" : undefined,
    next: guestSessionId ? undefined : { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies from TMDB: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as MovieSearchResponse;
  return guestSessionId ? attachRatings(data, guestSessionId) : data;
}

export async function createGuestSession(): Promise<GuestSessionResponse> {
  const response = await fetch(`${TMDB_BASE_URL}/authentication/guest_session/new`, {
    headers: { Authorization: `Bearer ${getApiKey()}`, Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create TMDB guest session: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<GuestSessionResponse>;
}

export async function getGenres(): Promise<Genre[]> {
  const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?language=en-US`, {
    headers: { Authorization: `Bearer ${getApiKey()}`, Accept: "application/json" },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch genres from TMDB: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as GenresResponse;
  return data.genres;
}

export async function rateMovie(
  movieId: number,
  guestSessionId: string,
  rating: number,
): Promise<void> {
  const url = new URL(`${TMDB_BASE_URL}/movie/${movieId}/rating`);
  url.searchParams.set("guest_session_id", guestSessionId);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ value: rating }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to rate movie: ${response.status} ${response.statusText}`);
  }
}

export async function rateMovieAction(movieId: number, rating: number): Promise<void> {
  const cookieStore = await cookies();
  const guestSessionId = cookieStore.get(guestSessionCookieName)?.value;

  if (!guestSessionId) {
    throw new Error("No guest session found. Please refresh the page and try again.");
  }

  await rateMovie(movieId, guestSessionId, rating);

  revalidatePath("/");
  revalidatePath("/rated");
}
