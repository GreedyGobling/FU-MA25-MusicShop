const apiURL = "https://musicbrainz.org/ws/2/";

export type Artist = {
  id: string;
  name: string;
};

export async function getArtist(query: string) {
  const response = await fetch(`${apiURL}artist?query=${encodeURIComponent(query)}&limit=5&fmt=json`);

  if (!response.ok) {
    throw new Error("api call failed");
  }

  const data = await response.json();
  return data.artists as Artist[];
}
