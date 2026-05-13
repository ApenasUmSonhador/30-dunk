"use client";

import { useGame } from "@/context/GameContext";

export function HistoryPanel() {
  const { state } = useGame();

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        Histórico
      </h2>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {state.history.map((item) => (
          <div
            key={item.id}
            className="border rounded p-2 text-sm"
          >
            <div>{item.description}</div>

            <div className="text-gray-500">
              {new Date(
                item.timestamp
              ).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}