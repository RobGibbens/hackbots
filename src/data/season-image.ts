export function defaultLogoFromMap<T>(id: string, logos: Record<string, T>): T | undefined {
  for (const [path, image] of Object.entries(logos)) {
    const file = path.split("/").pop() ?? "";
    const stem = file.replace(/\.[^.]+$/, "");
    if (stem === id) return image;
  }
  return undefined;
}

export function pickSeasonImage<T>(override: T | undefined, fallback: T | undefined): T | undefined {
  return override ?? fallback;
}

export function seasonImageAlt(game: string, imageAlt: string | undefined, hasOverride: boolean): string {
  if (hasOverride && imageAlt) return imageAlt;
  return `${game} game logo`;
}
