"use client";

import { useGame } from "@/context/GameContext";

export default function Home() {
  const { state, dispatch } = useGame();

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Basketball Scoreboard
      </h1>

      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={() =>
          dispatch({
            type: "ADD_PLAYER",
            payload: {
              teamId: "home",
              playerName: "Jordan",
            },
          })
        }
      >
        Adicionar Jogador
      </button>

      <div className="mt-8">
        {state.teams.home.players.map((player) => (
          <div key={player.id}>
            {player.name} - {player.points}
          </div>
        ))}
      </div>
    </main>
  );
}