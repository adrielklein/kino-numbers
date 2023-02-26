import React, { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import "./Game.css";
import {
  GameDate,
  GameType,
  setSelectedGame,
} from "./kinoSlice";

interface HeaderBoxProps {
  label: string;
  value: string;
}
const HeaderBox: React.FC<HeaderBoxProps> = ({ label, value }) => (
  <div className="header-box">
    <div className="header-label">{label}</div>
    <div className="header-value">{value}</div>
  </div>
);

const formatGameDate = (date: GameDate) => `${date.m}/${date.d}/${date.year}`;

interface GameProps {
  game: GameType;
  isSelected: boolean;
}

const Game: React.FC<GameProps> = ({ game, isSelected }) => {
  const { gameNumber, gameDate, drawNumbers } = game;
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(setSelectedGame(isSelected ? null : game));
  }, [isSelected, dispatch]);
  return (
    <div
      className={`outer-container ${
        isSelected ? "outer-container-selected" : ""
      }`}
      onClick={handleClick}
    >
      <div className="header">
        <HeaderBox label={"GAME"} value={gameNumber} />
        <HeaderBox label={"DATE"} value={formatGameDate(gameDate)} />
      </div>
      <div className="number-grid">
        {drawNumbers.map((number) => (
          <div className="number" key={number}>
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
