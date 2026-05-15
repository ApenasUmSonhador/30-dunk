"use client";

import { useState } from "react";

import { TeamSide } from "@/types/game";

import { useEffect } from "react";

import { useGame } from "@/context/GameContext";

interface TeamCardProps {
  teamId: TeamSide;
}

export function TeamCard({
  teamId,
}: TeamCardProps) {
  const { state, dispatch } = useGame();

  const [playerName, setPlayerName] = useState("");

  const team = state.teams[teamId];

  const [teamName, setTeamName] =
  useState("");

  useEffect(() => {
    setTeamName(team.name);
  }, [team.name]);


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
  
  const sortedPlayers = [
  ...team.players,
  ].sort((a, b) =>
    b.points - a.points
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <input
          className="text-2xl font-bold border-b outline-none"
          value={teamName}
          onChange={(e) =>
            setTeamName(e.target.value)
          }
          onBlur={() =>
            dispatch({
              type: "EDIT_TEAM_NAME",
              payload: {
                teamId,
                name: teamName,
              },
            })
          }
        />

        <span className="text-5xl font-extrabold">
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
          className="bg-black text-white px-4 rounded border"
          onClick={handleAddPlayer}
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {sortedPlayers.map((player) => (
          <div
            key={player.id}
            className="border rounded-lg p-4 bg-gray-50"
          >
            <input
              className="font-semibold border-b outline-none"
              value={player.name}
              onChange={(e) =>
                dispatch({
                  type: "EDIT_PLAYER",
                  payload: {
                    teamId,
                    playerId: player.id,
                    name: e.target.value,
                  },
                })
              }
            />

            <div className="text-sm text-gray-500 mt-2">
              FT: {player.onePoint} | 2PT:{" "}
              {player.twoPoints} | 3PT:{" "}
              {player.threePoints}
            </div>

            <div className="flex items-center justify-between mt-2">
              <span>{player.points} pts</span>

              <div className="flex gap-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_PLAYER",
                      payload: {
                        teamId,
                        playerId: player.id,
                      },
                    })
                  }
                >
                  Remove
                </button>
                <button
                  className="bg-green-600 px-2 rounded text-white"
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
                  className="bg-green-600 px-2 rounded text-white"
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
                  className="bg-green-600 px-2 rounded text-white"
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