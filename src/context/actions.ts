import { GameState, TeamSide } from "@/types/game";

export type Action =
  | {
      type: "ADD_PLAYER";
      payload: {
        teamId: TeamSide;
        playerName: string;
      };
    }

  | {
      type: "EDIT_TEAM_NAME";
      payload: {
        teamId: TeamSide;
        name: string;
      };
    }

  | {
    type: "ADD_POINTS";
    payload: {
      teamId: TeamSide;
      playerId: string;
      points: 1 | 2 | 3;
    };
  }

| {
    type: "EDIT_PLAYER";
    payload: {
      teamId: TeamSide;
      playerId: string;
      name: string;
    };
  }

  | {
    type: "REMOVE_PLAYER";
    payload: {
      teamId: TeamSide;
      playerId: string;
    };
  }

  // Clock actions
  | {
    type: "START_CLOCK";
  }

| {
    type: "PAUSE_CLOCK";
  }

  | {
    type: "TICK_CLOCK";
  }

  | {
    type: "NEXT_PERIOD";
  }

  | {
    type: "END_GAME";
  }

  | {
    type: "RESET_GAME";
  }

  | {
    type: "UNDO";
  }

  | {
    type: "REDO";
  }

  | {
    type: "LOAD_STATE";
    payload: GameState;
  }