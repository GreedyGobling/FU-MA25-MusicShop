const apiURL = "https://www.theaudiodb.com/api/v1/json/123/artist-mb.php?i=";

export type ArtistCover = {
  idArtist: string;
  strArtist: string;
  strArtistThumb: string | null;
  strArtistFanart: string | null;
  strArtistLogo: string | null;
};

export async function getArtistCover(id: string): Promise<ArtistCover | null> {
  const response = await fetch(`${apiURL}${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error(`API call failed (${response.status} ${response.statusText})`);
  }

  const data = await response.json();
  return (data.artists?.[0] as ArtistCover) ?? null;
}

// <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//<metadata created="2026-10-12T20:42:06.289Z" xmlns="http://musicbrainz.org/ns/mmd-2.0#" xmlns:ns2="http://musicbrainz.org/ns/ext#-2.0">
//    <artist-list count="29" offset="0">
//        <artist id="16a43d5e-c52d-4eaa-9c3b-00b2c1d8e816" type="Group" need the id of this from mb
// https://www.theaudiodb.com/api/v1/json/123/artist-mb.php?i=16a43d5e-c52d-4eaa-9c3b-00b2c1d8e816
// https://www.theaudiodb.com/api/v1/json/123/artist-mb.php?i=
