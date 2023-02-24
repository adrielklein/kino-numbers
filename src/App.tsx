import { useCallback, useEffect, useMemo, useRef } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Game from "./features/kino/Game";
import {
  fetchGamesAsync,
  selectGames,
  selectMinFetchedGames,
  selectOldestDrawId,
  selectStatus,
  increaseMinFetchedGames,
  INITIAL_MIN_FETCHED_GAMES,
} from "./features/kino/kinoSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

const LoadingState = () => (
  <div className="SpinnerContainer">
    <Spinner className="Spinner" animation="border" variant="light" />
  </div>
);

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const status = useAppSelector(selectStatus);
  const oldestDrawId = useAppSelector(selectOldestDrawId);
  const minFetchedGames = useAppSelector(selectMinFetchedGames);
  const numFetchedGames = useMemo(() => games.length, [games]);
  const isInitialLoadingState = useMemo(
    () => numFetchedGames < INITIAL_MIN_FETCHED_GAMES,
    [status, numFetchedGames]
  );

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current!;

    if (scrollTop + clientHeight === scrollHeight) {
      dispatch(increaseMinFetchedGames());
    }
  }, [dispatch, scrollRef]);

  useEffect(() => {
    if (numFetchedGames < minFetchedGames) {
      dispatch(fetchGamesAsync(oldestDrawId));
    }
  }, [dispatch, minFetchedGames, oldestDrawId]);

  if (status === "failed") {
    return (
      <div>Failed to load data. Please refresh app or contact support.</div>
    );
  }

  return (
    <div className="App">
      <div className="AppHeader">KINO</div>
      {isInitialLoadingState ? (
        <LoadingState />
      ) : (
        <div
          className="Content ContentColumns"
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ height: "100vh", overflow: "auto" }}
        >
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
