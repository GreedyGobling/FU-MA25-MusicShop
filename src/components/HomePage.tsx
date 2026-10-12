import { useState, type FormEvent } from "react";
import { getArtist, type Artist } from "../api/musicbrainz.ts";

const APISTATE ={
  NOTHING: "Nothing",
  LOADING: "Loading",
  DONE: "Done",
  FAIL: "Fail",
}

function HomePage() {
  const [currentAPIState, setAPIState] = useState(APISTATE.NOTHING);
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [errorMessage, setErrorMessage] = useState("");


  async function search(e: FormEvent) {
    e.preventDefault();
    setAPIState(APISTATE.LOADING);

    try {
      const result = await getArtist(query);
      setArtists(result);
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
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
