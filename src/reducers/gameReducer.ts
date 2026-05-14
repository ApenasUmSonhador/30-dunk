import { Action } from "@/context/actions";
import { initialState } from "@/context/initialState";
import { createSnapshot } from "@/utils/createSnapshot";
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

      const snapshot = createSnapshot(state);

      return {
        ...state,

        teams: {
          ...state.teams,

          [teamId]: {
            ...team,

            players: [...team.players, newPlayer],
          },
        },

        history: [
          {
            id: uuid(),
            type: "ADD_PLAYER",
            description: `${trimmedName} foi adicionado`,
            timestamp: Date.now(),
          },

          ...state.history,
        ],
        undoStack: [
          ...state.undoStack,
          snapshot,
        ],

        redoStack: [],
      };
    }

    case "ADD_POINTS": {
      if (state.clock.isFinished) {
        return state;
      }
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

      const snapshot = createSnapshot(state);
      
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
        history: [
          {
            id: uuid(),
            type: "ADD_POINTS",
            description: `${points} pontos adicionados a ${team.players.find(player => player.id === playerId)?.name}`,
            timestamp: Date.now(),
          },

          ...state.history,
        ],
        undoStack: [
          ...state.undoStack,
          snapshot,
        ],

        redoStack: [],
        scoreEvents: [
          {
            id: uuid(),

            playerId,

            playerName:
              team.players.find(
                (player) => player.id === playerId
              )?.name || "",

            teamId,

            points,

            period: state.clock.currentPeriod,

            timestamp: Date.now(),
          },

          ...state.scoreEvents,
        ]
      };
    }
    
    case "EDIT_TEAM_NAME": {
      const { teamId, name } = action.payload;

      if (!name.trim()) {
        return state;
      }

      const snapshot = createSnapshot(state);

      return {
        ...state,

        teams: {
          ...state.teams,

          [teamId]: {
            ...state.teams[teamId],

            name: name.trim(),
          },
        },
        history: [
          {
            id: uuid(),
            type: "EDIT_TEAM_NAME",
            description: `Nome do time alterado para ${name.trim()}`,
            timestamp: Date.now(),
          },
          ...state.history,
        ],
          undoStack: [
          ...state.undoStack,
          snapshot,
        ],

        redoStack: [],
      };
    }
    
    case "EDIT_PLAYER": {
      const {
        teamId,
        playerId,
        name,
      } = action.payload;

      const trimmedName = name.trim();

      if (!trimmedName) {
        return state;
      }

      const team = state.teams[teamId];

      const alreadyExists = team.players.some(
        (player) =>
          player.id !== playerId &&
          player.name.toLowerCase() ===
            trimmedName.toLowerCase()
      );

      if (alreadyExists) {
        return state;
      }

      const updatedPlayers = team.players.map(
        (player) => {
          if (player.id !== playerId) {
            return player;
          }

          return {
            ...player,

            name: trimmedName,
          };
        }
      );

      const snapshot = createSnapshot(state)

      return {
        ...state,

        teams: {
          ...state.teams,

          [teamId]: {
            ...team,

            players: updatedPlayers,
          },
        },
        history: [
          {
            id: uuid(),
            type: "EDIT_PLAYER",
            description: `Jogador ${team.players.find(player => player.id === playerId)?.name} editado para ${trimmedName}`,
            timestamp: Date.now(),
          },
          ...state.history,
        ],
          undoStack: [
          ...state.undoStack,
          snapshot,
        ],

        redoStack: [],
      };
    }

    case "REMOVE_PLAYER": {
      const { teamId, playerId } =
        action.payload;

      const team = state.teams[teamId];

      const updatedPlayers = team.players.filter(
        (player) => player.id !== playerId
      );

      const snapshot = createSnapshot(state)

      return {
        ...state,

        teams: {
          ...state.teams,

          [teamId]: {
            ...team,

            players: updatedPlayers,
          },
        },
        history: [
          {
            id: uuid(),
            type: "REMOVE_PLAYER",
            description: `Jogador ${team.players.find(player => player.id === playerId)?.name} removido`,
            timestamp: Date.now(),
          },
          ...state.history,
        ],
          undoStack: [
          ...state.undoStack,
          snapshot,
        ],

        redoStack: [],
      };
    }
 
    case "START_CLOCK": {
      if (state.clock.isFinished) {
        return state;
      }

      return {
        ...state,

        clock: {
          ...state.clock,

          isRunning: true,
        },
      };
    }

    case "PAUSE_CLOCK": {
      return {
        ...state,

        clock: {
          ...state.clock,

          isRunning: false,
        },
      };
    }

    case "TICK_CLOCK": {
      if (!state.clock.isRunning) {
        return state;
      }

      if (state.clock.timeLeft <= 0) {
        return {
          ...state,

          clock: {
            ...state.clock,

            isRunning: false,
          },
        };
      }

      return {
        ...state,

        clock: {
          ...state.clock,

          timeLeft: state.clock.timeLeft - 1,
        },
      };
    }

    case "NEXT_PERIOD": {
      if (state.clock.currentPeriod >= 4) {
        return {
          ...state,

          clock: {
            ...state.clock,

            isFinished: true,

            isRunning: false,
          },
        };
      }

      const snapshot = createSnapshot(state)


      return {
        ...state,

        clock: {
          ...state.clock,

          currentPeriod:
            state.clock.currentPeriod + 1,

          timeLeft: 600,

          isRunning: false,
        },

        history: [
          {
            id: uuid(),
            type: "NEXT_PERIOD",
            description: `Período ${
              state.clock.currentPeriod + 1
            } iniciado`,
            timestamp: Date.now(),
          },

          ...state.history,
        ],
          undoStack: [
          ...state.undoStack,
          snapshot,
        ],

        redoStack: [],
      };
    }

    case "END_GAME": {
      return {
        ...state,

        clock: {
          ...state.clock,

          isFinished: true,

          isRunning: false,
        },
      };
    }

    case "RESET_GAME": {
      return initialState;
    }

    case "UNDO": {
      if (state.undoStack.length === 0) {
        return state;
      }

      const previous =
        state.undoStack[
          state.undoStack.length - 1
        ];

      return {
        ...previous,

        undoStack: state.undoStack.slice(
          0,
          -1
        ),

        redoStack: [
          ...state.redoStack,
          createSnapshot(state),
        ],
      };
    }

    case "REDO": {
      if (state.redoStack.length === 0) {
        return state;
      }

      const next =
        state.redoStack[
          state.redoStack.length - 1
        ];

      return {
        ...next,

        redoStack: state.redoStack.slice(0, -1),

        undoStack: [
          ...state.undoStack,
          createSnapshot(state),
        ],
      };
    }

    case "LOAD_STATE": {
      return action.payload;
    }

    default:
      return state;
  }
}