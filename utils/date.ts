import { format, parseISO } from "date-fns";

export function formatMovieDate(dateString: string): string {
  if (!dateString) return "Unknown date";

  try {
    return format(parseISO(dateString), "MMMM d, yyyy");
  } catch {
    return "Unknown date";
  }
}
