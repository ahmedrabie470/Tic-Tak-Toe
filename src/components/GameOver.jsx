import React from "react";

export default function GameOver({ Winner , onRestart }) {
  return (
    <div id="game-over">
      <h2> Game Over</h2>
      {Winner &&<p>{Winner} Won </p>}
      {!Winner &&<p>It's Draw </p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
