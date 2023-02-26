import React from "react";
import "./Game.css";
import { GameDate, GameType } from "./kinoSlice";

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

const Game: React.FC<GameType & { onClick: () => void }> = ({
  gameNumber,
  gameDate,
  drawNumbers,
  onClick,
}) => {
  return (
    <div className="outer-container" onClick={onClick}>
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
