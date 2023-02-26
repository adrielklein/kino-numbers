import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Game from "./features/kino/Game";
import {
  fetchGamesAsync,
  increaseMinFetchedGames,
  setSelectedGame,
  INITIAL_MIN_FETCHED_GAMES,
  selectGames,
  selectMinFetchedGames,
  selectOldestDrawId,
  selectSelectedGame,
  selectStatus,
} from "./features/kino/kinoSlice";
import Modal from "react-bootstrap/Modal";

const LoadingState = () => (
  <div className="spinner-container">
    <Spinner className="spinner" animation="border" variant="light" />
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
          className="content content-columns"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {games.map((game) => (
            <Game key={game.gameNumber} game={game} isSelected={false} />
          ))}
          {status === "loading" && <LoadingState />}
        </div>
      )}
    </>
  );
};

const FailedState = () => (
  <div className="message">
    Failed to load data. Please refresh app or contact support.
  </div>
);

function App() {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const status = useAppSelector(selectStatus);
  const oldestDrawId = useAppSelector(selectOldestDrawId);
  const minFetchedGames = useAppSelector(selectMinFetchedGames);
  const selectedGame = useAppSelector(selectSelectedGame);
  const numFetchedGames = useMemo(() => games.length, [games]);
  const isInitialLoadingState = useMemo(
    () => numFetchedGames < INITIAL_MIN_FETCHED_GAMES,
    [status, numFetchedGames]
  );

  const hideModal = useCallback(() => {
    dispatch(setSelectedGame(null));
  }, [dispatch]);

  useEffect(() => {
    if (numFetchedGames < minFetchedGames) {
      dispatch(fetchGamesAsync(oldestDrawId));
    }
  }, [dispatch, minFetchedGames, oldestDrawId]);

  return (
    <div className="app">
      <div className="app-header">KINO</div>
      {status === "failed" ? (
        <FailedState />
      ) : (
        <SuccessState isInitialLoadingState={isInitialLoadingState} />
      )}

      <Modal
        show={!!selectedGame}
        onHide={hideModal}
        contentClassName="modal"
        size="sm"
        centered
      >
        <Modal.Body onClick={hideModal}>
          {selectedGame && <Game game={selectedGame} isSelected={true} />}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
