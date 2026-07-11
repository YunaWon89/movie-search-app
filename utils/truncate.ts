export function truncateText(text: string, maxLength: number, ellipsis = "..."): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  const sliceLength = maxLength - ellipsis.length;
  const sliced = text.slice(0, Math.max(sliceLength, 0));

  const lastSpaceIndex = sliced.lastIndexOf(" ");
  const safeSlice = lastSpaceIndex > 0 ? sliced.slice(0, lastSpaceIndex) : sliced;

  return `${safeSlice.trimEnd()}${ellipsis}`;
}
