const apiURL = "https://coverartarchive.org/release-group/";

export function albumCoverUrl(releaseGroupId: string, size: 250 | 500 = 250): string {
  return `${apiURL}${encodeURIComponent(releaseGroupId)}/front-${size}`;
}
