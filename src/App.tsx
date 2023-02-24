import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
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
    console.log('using affect')
    dispatch(fetchGamesAsync());
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load data</div>;
  }

  return <div className="App">{JSON.stringify(games)}</div>;
}

export default App;
