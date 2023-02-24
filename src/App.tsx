import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Game from "./features/kino/Game";
import {
  fetchGamesAsync,
  selectGames,
  selectStatus,
} from "./features/kino/kinoSlice";

function App() {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const status = useAppSelector(selectStatus);
  useEffect(() => {
    dispatch(fetchGamesAsync());
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
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
