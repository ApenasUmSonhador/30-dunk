import { GameState } from "@/types/game";

export function createSnapshot(
  state: GameState
) {
  return {
    teams: state.teams,

    clock: state.clock,

    history: state.history,

    scoreEvents: state.scoreEvents,
  };
}