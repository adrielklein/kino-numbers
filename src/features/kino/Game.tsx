import React from "react";
import "./Game.css";
import { GameDate, GameType } from "./kinoSlice";

interface HeaderBoxProps {
  label: string;
  value: string;
}
const HeaderBox: React.FC<HeaderBoxProps> = ({ label, value }) => (
  <div className="HeaderBox">
    <div className="HeaderLabel">{label}</div>
    <div className="HeaderValue">{value}</div>
  </div>
);

const formatGameDate = (date: GameDate) => `${date.m}/${date.d}/${date.year}`;

const Game: React.FC<GameType> = ({ gameNumber, gameDate, drawNumbers }) => {
  return (
    <div className="Container">
      <div className="Header">
        <HeaderBox label={"Game"} value={gameNumber} />
        <HeaderBox label={"Date"} value={formatGameDate(gameDate)} />
      </div>
      <div className="NumberGrid">
        {drawNumbers.map((number) => (
          <div className="Number">{number}</div>
        ))}
      </div>
    </div>
  );
};

export default Game;
