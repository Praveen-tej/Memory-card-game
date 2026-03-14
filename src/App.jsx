import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}
