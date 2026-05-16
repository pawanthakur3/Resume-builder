import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import BuilderPage from "./pages/BuilderPage";
import "./styles/globals.css";

export default function App() {
  const [view, setView] = useState("landing");
  if (view === "builder") return <BuilderPage onBack={() => setView("landing")} />;
  return <LandingPage onStart={() => setView("builder")} />;
}
