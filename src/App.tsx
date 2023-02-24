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

const SuccessState = (props: { isInitialLoadingState: boolean }) => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const status = useAppSelector(selectStatus);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current!;

    if (scrollTop + clientHeight === scrollHeight) {
      dispatch(increaseMinFetchedGames());
    }
  }, [dispatch, scrollRef]);

  return (
    <>
      {props.isInitialLoadingState ? (
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
    </>
  );
};

const FailedState = () => (
  <div className="Message">
    Failed to load data. Please refresh app or contact support.
  </div>
);

function App() {
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

  useEffect(() => {
    if (numFetchedGames < minFetchedGames) {
      dispatch(fetchGamesAsync(oldestDrawId));
    }
  }, [dispatch, minFetchedGames, oldestDrawId]);

  return (
    <div className="App">
      <div className="AppHeader">KINO</div>
      {status === "failed" ? (
        <FailedState />
      ) : (
        <SuccessState isInitialLoadingState={isInitialLoadingState} />
      )}
    </div>
  );
}

export default App;
