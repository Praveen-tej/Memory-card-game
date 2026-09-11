import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/HomePage";
import FirecrawlTest from "./fireCrawl-test/fireCrawl";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/firecrawl-test" element={<FirecrawlTest />} />
    </Routes>
    
  );
}