"use client";

import { useGame } from "@/context/GameContext";

import {
  getPointsByPeriod,
  getTopScorer,
  getWinner,
} from "@/utils/statistics";

export function StatsPanel() {
  const { state } = useGame();

  const topScorer =
    getTopScorer(state);

  const winner =
    getWinner(state);

  const periods =
    getPointsByPeriod(state);

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Estatísticas
      </h2>

      <div className="space-y-4">
        <div>
          <strong>Cestinha:</strong>{" "}
          {topScorer
            ? `${topScorer.name} (${topScorer.points} pts)`
            : "Nenhum"}
        </div>

        <div>
          <strong>Vencedor:</strong>{" "}
          {winner}
        </div>

        <div>
          <strong>Placar:</strong>{" "}
          {state.teams.home.score} x{" "}
          {state.teams.away.score}
        </div>

        <div>
          <strong>Pontos por período</strong>

          <div className="mt-2 space-y-1">
            {periods.map((period) => (
              <div key={period.period}>
                Q{period.period}:{" "}
                {period.total} pts
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}