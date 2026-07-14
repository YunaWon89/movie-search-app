"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { rateMovie } from "@/lib/tmdb";
import { GUEST_SESSION_COOKIE } from "@/lib/constants";

export async function rateMovieAction(movieId: number, rating: number): Promise<void> {
  const cookieStore = await cookies();
  const guestSessionId = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

  if (!guestSessionId) {
    throw new Error("No guest session found. Please refresh the page and try again.");
  }

  await rateMovie(movieId, guestSessionId, rating);

  revalidatePath("/");
  revalidatePath("/rated");
}
