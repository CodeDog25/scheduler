import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      setHistory(prevHistory => [...prevHistory, newMode]);
    } else {
      setMode(newMode);
      setHistory(prevHistory => [...prevHistory.slice(0, -1), newMode]);
    }
  };
    
  const back = function () {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prevHistory => prevHistory.slice(0, -1));
    }
  };

    
  return { mode, transition, back };
}