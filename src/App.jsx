import { useEffect, useState } from "react";
import Header from "./components/Header";
import GameCards from "./components/GameCard";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const cardValues = [
  "🐶",
  "🐱",
  "🐼",
  "🦁",
  "🐯",
  "🐸",
  "🐵",
  "🐰",
  "🐶",
  "🐱",
  "🐼",
  "🦁",
  "🐯",
  "🐸",
  "🐵",
  "🐰",
];

function App() {
  const [scores, setScores] = useState(0);
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");

  const newGame = (level) => {
    const currentDifficulty = level || difficulty;

    let selectedCards;
    if (currentDifficulty === "Easy") {
      const unique = cardValues.slice(0, 4);
      selectedCards = [...unique, ...unique];
    } else if (currentDifficulty === "Medium") {
      const unique = cardValues.slice(0, 6);
      selectedCards = [...unique, ...unique];
    } else {
      selectedCards = cardValues.slice(0, 16);
    }
    const startingCards = selectedCards.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    startingCards.sort(() => Math.random() - 0.5);
    console.log(startingCards);

    setCards(startingCards);
    setScores(0);
    setMoves(0);
    setIsWon(false);
    setIsDisabled(false);
  };

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      setMoves((prev) => prev + 1);
      if (flippedCards[0].value === flippedCards[1].value) {
        console.log("Matched");
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

  const cardClick = (card) => {
    if (isDisabled) return;

    if (card.isFlipped || card.isMatched || flippedCards.length === 2) {
      return;
    }

    console.log(flippedCards);
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
      />

      {isWon && <div className="win-message">🎉 You Win!</div>}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <GameCards key={index} card={card} onCardClick={cardClick} />
        ))}
      </div>
    </>
  );
}

export default App;
