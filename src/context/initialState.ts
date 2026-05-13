import { GameState } from "@/types/game";

export const initialState: GameState = {
  teams: {
    home: {
      id: "home",
      name: "Time A",
      score: 0,
      players: [],
    },

    away: {
      id: "away",
      name: "Time B",
      score: 0,
      players: [],
    },
  },

  clock: {
    currentPeriod: 1,
    timeLeft: 600,
    isRunning: false,
    isFinished: false,
  },

  history: [],

  scoreEvents: [],
  
  undoStack: [],

  redoStack: [],
};