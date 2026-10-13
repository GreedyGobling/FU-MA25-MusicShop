import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getArtistCover, type ArtistCover } from "../api/theaudiodb.ts";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [loadedID, setLoadedID] = useState(id);

  if (id !== loadedID) {
    setLoadedID(id);
    setAPIState(APISTATE.LOADING);
    setCover(null);
    setErrorMessage("");
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
    </div>
  );
}

export default ArtistPage;
