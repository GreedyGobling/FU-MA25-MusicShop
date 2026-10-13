import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getArtistCover, type ArtistCover } from "../api/theaudiodb.ts";
import { getAlbums, type Album } from "../api/musicbrainz.ts";
import { albumCoverUrl } from "../api/coverart.ts";

const APISTATE = {
  NOTHING: "Nothing",
  LOADING: "Loading",
  DONE: "Done",
  FAIL: "Fail",
};

function ArtistPage() {
  const { id } = useParams();
  const [currentAPIState, setAPIState] = useState(APISTATE.LOADING);
  const [cover, setCover] = useState<ArtistCover | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [albumError, setAlbumError] = useState("");
  const [loadedID, setLoadedID] = useState(id);

  if (id !== loadedID) {
    setLoadedID(id);
    setAPIState(APISTATE.LOADING);
    setCover(null);
    setAlbums([]);
    setErrorMessage("");
    setAlbumError("");
  }

  useEffect(() => {
    if (!id) return;

    getArtistCover(id)
      .then((result) => {
        setCover(result);
        setAPIState(APISTATE.DONE);
      })
      .catch((error) => {
        setErrorMessage(error instanceof Error ? error.message : "Unknown error");
        setAPIState(APISTATE.FAIL);
      });

    getAlbums(id)
      .then((result) => {
        setAlbums(result);
        setAlbumError("");
      })
      .catch((error) => {
        setAlbums([]);
        setAlbumError(error instanceof Error ? error.message : "Unknown error");
      });
  }, [id]);

  if (currentAPIState === APISTATE.LOADING) return <p>Loading...</p>;
  if (currentAPIState === APISTATE.FAIL) return <p>{errorMessage}</p>;

  return (
    <div>
      <Link to="/">Back</Link>
      {cover?.strArtistThumb && (
        <img src={cover.strArtistThumb} alt={cover.strArtist} width={300} />
      )}
      <h1>{cover?.strArtist ?? id}</h1>
      <h2>{cover?.strBiography ?? null}</h2>
      <h2>Albums</h2>
      {albumError ? (
        <p>Could not load albums: {albumError}</p>
      ) : (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              <img
                src={albumCoverUrl(album.id)}
                alt={album.title}
                width={100}
              />
              <span>{album.title}</span>
              {album.firstReleaseDate && <span> ({album.firstReleaseDate})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArtistPage;
