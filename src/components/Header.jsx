export default function Header({scores,moves , onReset}){
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
            <button  onClick={onReset} className="reset-btn">New Game</button>
        </div>
    )
}