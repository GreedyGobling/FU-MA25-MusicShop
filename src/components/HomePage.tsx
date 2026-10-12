import { useState, type FormEvent } from "react";
import { getArtist, type Artist } from "../api/musicbrainz.ts";

function HomePage() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function search(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      setArtists(await getArtist(query));
    } catch {
      setArtists([]);
    } finally{
      setIsLoading(false);
    }
  }

  if (isLoading) return <p>Loading...</p>;

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
