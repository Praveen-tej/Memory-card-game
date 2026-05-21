import Header from "./Header";
import GameCards from "./GameCard";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const cardValues = [
  "🐶","🐱", "🐼","🦁",
  "🐯","🐸","🐵","🐰",
  "🐶","🐱","🐼","🦁",
  "🐯","🐸","🐵","🐰",
];

function Game() {
  const [scores, setScores] = useState(0);
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gamekey, setGamekey] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const location = useLocation();
  const locationState = location.state;
  const initialDifficulty = locationState?.difficulty || "Easy";

  const [difficulty, setDifficulty] = useState(initialDifficulty);

  const [highscore, setHighscore] = useState(() => {
    return (
      JSON.parse(localStorage.getItem(`highscore_${initialDifficulty}`)) || 0
    );
  });

  const newGame = (level) => {
    setGamekey((prev) => prev + 1);
    clearInterval(timerRef.current);

    const currentDifficulty =
      level || difficulty || initialDifficulty || "Easy";

    const savedHighscore =
      JSON.parse(localStorage.getItem(`highscore_${currentDifficulty}`)) || 0;
    setHighscore(savedHighscore);

    let selectedCards;
    if (currentDifficulty === "Easy") {
      const unique = cardValues.slice(0, 4);
      selectedCards = [...unique, ...unique];
      setTimer(30);
    } else if (currentDifficulty === "Medium") {
      const unique = cardValues.slice(0, 6);
      selectedCards = [...unique, ...unique];
      setTimer(60);
    } else {
      selectedCards = cardValues.slice(0, 16);
      setTimer(90);
    }

    const startingCards = selectedCards.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    startingCards.sort(()=> Math.random() - 0.5);
    setCards(startingCards);
    setScores(0);
    setMoves(0);
    setIsWon(false);
    setIsDisabled(false);
    setIsGameOver(false);
  };

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gamekey]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      setMoves((prev) => prev + 1);
      if (flippedCards[0].value === flippedCards[1].value) {
        setScores((prev) => prev + 1);
        const updatedCards = cards.map((c) => {
          if (c.value === flippedCards[0].value) {
            return { ...c, isMatched: true };
          } else {
            return c;
          }
        });
        setCards(updatedCards);
        setIsDisabled(false);
        if (updatedCards.every((c) => c.isMatched)) {
          setIsWon(true);
        }
      } else {
        setTimeout(() => {
          setCards(
            cards.map((c) => {
              if (c.isMatched) {
                return c;
              } else {
                return { ...c, isFlipped: false };
              }
            }),
          );
          setIsDisabled(false);
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (isWon) {
      clearInterval(timerRef.current);
      setIsGameOver(false);
      if (timer > highscore) {
        setHighscore(timer);
        localStorage.setItem(`highscore_${difficulty}`, JSON.stringify(timer));
      }
    }
  }, [isWon]);

  useEffect(() => {
    if (timer === 0 && cards.length > 0 && !isWon) {
      clearInterval(timerRef.current);
      setIsDisabled(true);
      setIsGameOver(true);
      setCards(cards.map((c) => ({ ...c, isFlipped: false })));
    }
  }, [timer]);

  const cardClick = (card) => {
    if (isDisabled) return;
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) {
      return;
    }
    const updateCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });
    setCards(updateCards);
    setFlippedCards([...flippedCards, card]);
  };

  const changeDifficulty = (level) => {
    setDifficulty(level);
    newGame(level);
  };

  return (
    <>
      <Header
        scores={scores}
        moves={moves}
        onReset={newGame}
        onDifficultyChange={changeDifficulty}
        difficulty={difficulty}
        timer={timer}
        highscore={highscore}
      />

      {isWon && <div className="win-message">🎉 You Win!</div>}
      {isGameOver && <div className="game-over-message">⏰ Time's Up!</div>}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <GameCards key={index} card={card} onCardClick={cardClick} />
        ))}
      </div>
    </>
  );
}
export default Game;
