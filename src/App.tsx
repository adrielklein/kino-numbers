import { useEffect, useMemo } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Game from "./features/kino/Game";
import {
  fetchGamesAsync,
  selectGames,
  selectOldestDrawId,
  selectStatus,
} from "./features/kino/kinoSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

const LoadingState = () => (
  <div className="SpinnerContainer">
    <Spinner className="Spinner" animation="border" variant="light" />
  </div>
);

function App() {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const status = useAppSelector(selectStatus);
  const oldestDrawId = useAppSelector(selectOldestDrawId);
  const numFetchedGames = useMemo(() => games.length, [games]);
  const isInitialLoadingState = useMemo(
    () => status === "loading" && numFetchedGames === 0,
    [status, numFetchedGames]
  );

  useEffect(() => {
    if (numFetchedGames < 15) {
      dispatch(fetchGamesAsync(oldestDrawId));
    }
  }, [dispatch, numFetchedGames, oldestDrawId]);

  if (status === "failed") {
    return <div>Failed to load data. Please refresh app or contact support.</div>;
  }

  return (
    <div>
      <div className="AppHeader">KINO</div>
      {isInitialLoadingState ? (
        <LoadingState />
      ) : (
        <div className="Content ContentColumns">
          {games.map((game) => (
            <Game key={game.gameNumber} {...game} />
          ))}
          {status === "loading" && <LoadingState />}
        </div>
      )}
    </div>
  );
}

export default App;
