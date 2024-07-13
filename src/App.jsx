import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

let INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const PLAYERS = {
  X: "Player 1 ",
  O: "Player 2 ",
}
function App() {
  let [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS );
  let activePLayer = driveActivePlayer(gameTurns);
  function driveWineer(gameBoard , players){
  let winner;
   
  for (const combinations of WINNING_COMBINATIONS) {
    const firstCombinations =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondCombinations =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdCombinations =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstCombinations &&
      firstCombinations === secondCombinations &&
      firstCombinations === thirdCombinations
    ) {
      winner = players[firstCombinations];
    }
  }
  return winner;
  }


  function driveGameBoard(gameTurns){
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
 return gameBoard;
  }

 
  const gameBoard = driveGameBoard(gameTurns)
  const winner = driveWineer(gameBoard , players) 
  let hasDraw = gameTurns.length === 9 && !winner;


  
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = driveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]:newName,
      };
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePLayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePLayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver Winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />{" "}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
