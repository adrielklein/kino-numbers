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

function App() {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const status = useAppSelector(selectStatus);
  const oldestDrawId = useAppSelector(selectOldestDrawId);
  const numFetchedGames = useMemo(() => games.length, [games]);

  useEffect(() => {
    if (numFetchedGames < 30) {
      dispatch(fetchGamesAsync(oldestDrawId));
    }
  }, [dispatch, numFetchedGames, oldestDrawId]);

  if (status === "loading") {
    return (
      <div style={{ width: "100px", height: "100px", background: "white" }}>
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return <div>Failed to load data</div>;
  }

  return (
    <div>
      <div className="AppHeader">KINO</div>
      <div className="Content">
        {games.map((game) => (
          <Game key={game.gameNumber} {...game} />
        ))}
      </div>
    </div>
  );
}

export default App;
