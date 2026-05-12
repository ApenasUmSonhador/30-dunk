"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
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