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

    default:
      return state;
  }
}