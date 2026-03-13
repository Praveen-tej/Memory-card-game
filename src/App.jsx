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

  const newGame = () => {
    const startingCards = cardValues.map((value, index) => ({
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
      //here setisDisabled(true)
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

  return (
    <>
      <Header scores={scores} moves={moves} onReset={newGame} />

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
