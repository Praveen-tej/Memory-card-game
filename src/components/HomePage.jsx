import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">🧠 Brain Hack</h1>
        <p className="home-description">
          Test your memory! Match all the cards to win!
        </p>
        <div className="difficulty-buttons">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              className={`difficulty-btn ${selectedDifficulty === level ? "active" : ""}`}
              onClick={() => setSelectedDifficulty(level)}
            >
              {level}
            </button>
          ))}
        </div>
        <button
          className="play-btn"
          onClick={() =>
            navigate("/game", { state: { difficulty: selectedDifficulty } })
          }
        >
          Play Now 🎮
        </button>
      </div>
    </div>
  );
}
