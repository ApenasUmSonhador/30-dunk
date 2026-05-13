"use client";

import { TeamCard } from "@/components/TeamCard";
import { HistoryPanel } from "@/components/HistoryPanel";

export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">
        Basketball Scoreboard
      </h1>

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