"use client";

import { useEffect } from "react";
import { useGame } from "@/context/GameContext";

import { TeamCard } from "@/components/TeamCard";
import { HistoryPanel } from "@/components/HistoryPanel";
import { GameControls } from "@/components/GameControls";

export default function Home() {

  const { state, dispatch } = useGame();
  useEffect(() => {
    if (!state.clock.isRunning) {
      return;
    }

    const interval = setInterval(() => {
      dispatch({
        type: "TICK_CLOCK",
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.clock.isRunning, dispatch]);


  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">
        Basketball Scoreboard
      </h1>

      <GameControls />

      <div className="grid grid-cols-2 gap-8">
        <TeamCard teamId="home" />

        <TeamCard teamId="away" />
      </div>

      <div className="mt-10">
        <HistoryPanel />
      </div>
    </main>
  );
}