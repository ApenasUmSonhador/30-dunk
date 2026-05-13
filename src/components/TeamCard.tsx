"use client";

import { useState } from "react";

import { TeamSide } from "@/types/game";

import { useGame } from "@/context/GameContext";

interface TeamCardProps {
  teamId: TeamSide;
}

export function TeamCard({
  teamId,
}: TeamCardProps) {
  const { state, dispatch } = useGame();

  const [playerName, setPlayerName] =
    useState("");

  const team = state.teams[teamId];

  function handleAddPlayer() {
    dispatch({
      type: "ADD_PLAYER",
      payload: {
        teamId,
        playerName,
      },
    });

    setPlayerName("");
  }

  return (
    <div className="border rounded-lg p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
            {team.name}
        </h2>

        <span className="text-3xl font-bold">
            {team.score}
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          className="border px-3 py-2 rounded w-full"
          type="text"
          placeholder="Nome do jogador"
          value={playerName}
          onChange={(e) =>
            setPlayerName(e.target.value)
          }
        />

        <button
          className="bg-black text-white px-4 rounded"
          onClick={handleAddPlayer}
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {team.players.map((player) => (
          <div
            key={player.id}
            className="border rounded p-3"
          >
            <div className="font-semibold">
              {player.name}
            </div>

            <div className="flex items-center justify-between mt-2">
              <span>{player.points} pts</span>

              <div className="flex gap-2">
                <button
                  className="bg-gray-200 px-2 rounded"
                  onClick={() =>
                    dispatch({
                      type: "ADD_POINTS",
                      payload: {
                        teamId,
                        playerId: player.id,
                        points: 1,
                      },
                    })
                  }
                >
                  +1
                </button>

                <button
                  className="bg-gray-200 px-2 rounded"
                  onClick={() =>
                    dispatch({
                      type: "ADD_POINTS",
                      payload: {
                        teamId,
                        playerId: player.id,
                        points: 2,
                      },
                    })
                  }
                >
                  +2
                </button>

                <button
                  className="bg-gray-200 px-2 rounded"
                  onClick={() =>
                    dispatch({
                      type: "ADD_POINTS",
                      payload: {
                        teamId,
                        playerId: player.id,
                        points: 3,
                      },
                    })
                  }
                >
                  +3
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}