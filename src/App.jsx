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

  const newGame = () => {
    const startingCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    startingCards.sort(() => Math.random() - 0.5)
    console.log(startingCards);
    

    setCards(startingCards);
    setScores(0);
    setMoves(0);
  };

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      if (flippedCards[0].value === flippedCards[1].value) {
        console.log("Matched");
        setScores((prev) => prev + 1);
        setCards(
          cards.map((c) => {
            if (c.value === flippedCards[0].value) {
              return { ...c, isMatched: true };
            } else {
              return c;
            }
          }),
        );
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
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  const cardClick = (card) => {
    if (card.isFlipped || card.isMatched) {
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

      <div className="cards-grid">
        {cards.map((card, index) => (
          <GameCards key={index} card={card} onCardClick={cardClick} />
        ))}
      </div>
    </>
  );
}

export default App;
