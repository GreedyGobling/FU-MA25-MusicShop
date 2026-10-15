import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getArtistCover, type ArtistCover } from "../api/theaudiodb.ts";
import { getAlbums, type Album } from "../api/musicbrainz.ts";
import { albumCoverUrl } from "../api/coverart.ts";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice.ts";
import "./ArtistPage.css";

const APISTATE = {
  NOTHING: "Nothing",
  LOADING: "Loading",
  DONE: "Done",
  FAIL: "Fail",
};

function ArtistPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
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
      <div className="artist-profile">
        {cover?.strArtistThumb && (
          <img src={cover.strArtistThumb} alt={cover.strArtist} width={300} />
        )}
        <div className="artist-bio">
          <h1>{cover?.strArtist ?? id}</h1>
          <p>{cover?.strBiography ?? null}</p>
        </div>
      </div>
      <h2>Albums</h2>
      <p>Demo price: 99 kr per album.</p>
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
              <button
                type="button"
                aria-label={`Buy ${album.title}`}
                onClick={() => dispatch(addToCart({
                  id: album.id,
                  name: album.title,
                  price: 99,
                  quantity: 1,
                }))}
              >
                Buy album
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArtistPage;
