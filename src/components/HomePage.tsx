import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { getArtist, type Artist } from "../api/musicbrainz.ts";
import { getArtistCover } from "../api/theaudiodb.ts";


// rename file ?

type SearchResult = Artist & {
  cover: string | null;
};

const APISTATE ={
  NOTHING: "Nothing",
  LOADING: "Loading",
  DONE: "Done",
  FAIL: "Fail",
}

function HomePage() {
  const [currentAPIState, setAPIState] = useState(APISTATE.NOTHING);
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<SearchResult[]>([]);
  const [errorMessage, setErrorMessage] = useState("");


  async function search(e: FormEvent) {
    e.preventDefault();
    setAPIState(APISTATE.LOADING);

    try {
      const result = await getArtist(query);

      const withCovers = await Promise.all(
        result.map(async (artist) => {
          try {
            const cover = await getArtistCover(artist.id);
            return { ...artist, cover: cover?.strArtistThumb ?? null };
          } catch {
            return { ...artist, cover: null };
          }
        }),
      );

      setArtists(withCovers);
      setAPIState(APISTATE.DONE);
    } catch (error){
      setArtists([]);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      setAPIState(APISTATE.FAIL);
    }
  }

  if (currentAPIState === APISTATE.LOADING) return <p>Loading...</p>;
  if (currentAPIState === APISTATE.FAIL) return <p>{errorMessage}</p>;

  return (
    <div>
      <form onSubmit={search}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </form>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link to={`/artist/${artist.id}`}>
              {artist.cover ? (
                <img src={artist.cover} alt={artist.name} width={100} />
              ) : (
                <span>No Cover: </span>
              )}
              <span>{artist.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
