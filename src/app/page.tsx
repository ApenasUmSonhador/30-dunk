"use client";

import { useState } from "react";
import { TeamCard } from "@/components/TeamCard";
import { HistoryPanel } from "@/components/HistoryPanel";
import { GameControls } from "@/components/GameControls";
import { StatsPanel } from "@/components/StatsPanel";

export default function Home() {

  const [showStats, setShowStats] = useState(true);

  const [showHistory, setShowHistory] = useState(true);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-10">
        30 Dunk - Scoreboard
      </h1>

      <GameControls />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TeamCard teamId="home" />

        <TeamCard teamId="away" />
      </div>

      <div className="flex gap-4 mt-10 mb-6">
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() =>
            setShowStats((prev) => !prev)
          }
        >
          {showStats
            ? "Ocultar Estatísticas"
            : "Mostrar Estatísticas"}
        </button>

        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() =>
            setShowHistory((prev) => !prev)
          }
        >
          {showHistory
            ? "Ocultar Histórico"
            : "Mostrar Histórico"}
        </button>
      </div>

      {(showStats || showHistory) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {showStats && <StatsPanel />}

          {showHistory && <HistoryPanel />}
        </div>
      )}
    </main>
  );
}