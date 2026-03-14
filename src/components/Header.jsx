export default function Header({
  scores,
  moves,
  onReset,
  onDifficultyChange,
  difficulty,
}) {
  return (
    <div>
      <div className="game-header">
        <h1>Memory Card Game</h1>
      </div>
      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{scores}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
      </div>
      <select
        className="difficulty-select"
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
      >
        <option value="" disabled>
          Select Level
        </option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <button onClick={onReset} className="reset-btn">
        New Game
      </button>
    </div>
  );
}
