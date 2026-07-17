export function getPosterUrl(posterPath: string | null, size: "w342" | "w500" = "w342"): string {
  if (!posterPath) return "/poster-placeholder.svg";
  const imageBase = process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";
  return `${imageBase}/${size}${posterPath}`;
}
