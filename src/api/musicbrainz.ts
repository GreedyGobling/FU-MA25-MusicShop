const apiURL = "https://musicbrainz.org/ws/2/";

export type Artist = {
  id: string;
  name: string;
};

export async function getArtist(query: string) {
  const response = await fetch(
    `${apiURL}artist?query=${encodeURIComponent(query)}&limit=5&fmt=json`,
  );

  if (!response.ok) {
    throw new Error(`API call failed (${response.status} ${response.statusText})`);
  }

  const data = await response.json();
  return data.artists as Artist[];
}

export type Album = {
  id: string;
  title: string;
  primaryType: string | null;
  firstReleaseDate: string | null;
};

type ReleaseGroup = {
  id: string;
  title: string;
  "primary-type"?: string | null;
  "first-release-date"?: string | null;
};

export async function getAlbums(artistId: string, limit = 25): Promise<Album[]> {
  const response = await fetch(
    `${apiURL}release-group?artist=${encodeURIComponent(artistId)}&type=album&limit=${limit}&fmt=json`,
  );

  if (!response.ok) {
    throw new Error(`API call failed (${response.status} ${response.statusText})`);
  }

  const data = await response.json();
  const groups = (data["release-groups"] ?? []) as ReleaseGroup[];

  return groups.map((group) => ({
    id: group.id,
    title: group.title,
    primaryType: group["primary-type"] ?? null,
    firstReleaseDate: group["first-release-date"] ?? null,
  }));
}
