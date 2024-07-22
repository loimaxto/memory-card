export default function Score({highScore,currentScore}) {
    return (
    <div id="header">
      <h3 id="best-score">High score:{highScore}</h3>
      <h3 id="current-score">Current score: {currentScore}</h3>
    </div>
    )
}

