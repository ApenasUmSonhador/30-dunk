import { Action } from "@/context/actions";
import { GameState, Player } from "@/types/game";
import { v4 as uuid } from "uuid";

export function gameReducer(
  state: GameState,
  action: Action
): GameState {
  switch (action.type) {
    case "ADD_PLAYER": {
      const { teamId, playerName } = action.payload;

      const trimmedName = playerName.trim();

      if (!trimmedName) {
        return state;
      }

      const team = state.teams[teamId];

      const alreadyExists = team.players.some(
        (player) =>
          player.name.toLowerCase() ===
          trimmedName.toLowerCase()
      );

      if (alreadyExists) {
        return state;
      }

      const newPlayer: Player = {
        id: uuid(),

        name: trimmedName,

        points: 0,

        onePoint: 0,
        twoPoints: 0,
        threePoints: 0,
      };

      return {
        ...state,

        teams: {
          ...state.teams,

          [teamId]: {
            ...team,

            players: [...team.players, newPlayer],
          },
        },
      };
    }

    case "ADD_POINTS": {
      const { teamId, playerId, points } =
        action.payload;

      const team = state.teams[teamId];

      const updatedPlayers = team.players.map(
        (player) => {
          if (player.id !== playerId) {
            return player;
          }

          return {
            ...player,

            points: player.points + points,

            onePoint:
              points === 1
                ? player.onePoint + 1
                : player.onePoint,

            twoPoints:
              points === 2
                ? player.twoPoints + 1
                : player.twoPoints,

            threePoints:
              points === 3
                ? player.threePoints + 1
                : player.threePoints,
          };
        }
      );

      updatedPlayers.sort(
        (a, b) => b.points - a.points
      );

      return {
        ...state,

        teams: {
          ...state.teams,

          [teamId]: {
            ...team,

            score: team.score + points,

            players: updatedPlayers,
          },
        },
      };
    }
 
    default:
      return state;
  }
}