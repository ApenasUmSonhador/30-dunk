"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { initialState } from "./initialState";

import { gameReducer } from "@/reducers/gameReducer";

import { GameState } from "@/types/game";

import { Action } from "./actions";

interface GameContextType {
  state: GameState;

  dispatch: Dispatch<Action>;
}

const GameContext = createContext<GameContextType | null>(
  null
);

interface ProviderProps {
  children: ReactNode;
}

export function GameProvider({
  children,
}: ProviderProps) {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState
  );

  useEffect(() => {
    const saved = localStorage.getItem(
      "basketball-game"
    );

    if (saved) {
      dispatch({
        type: "LOAD_STATE",
        payload: JSON.parse(saved),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "basketball-game",
      JSON.stringify(state)
    );
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGame must be used inside GameProvider"
    );
  }

  return context;
}