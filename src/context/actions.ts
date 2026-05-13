import { TeamSide } from "@/types/game";

export type Action =
  | {
      type: "ADD_PLAYER";
      payload: {
        teamId: TeamSide;
        playerName: string;
      };
    }

  | {
      type: "REMOVE_PLAYER";
      payload: {
        teamId: TeamSide;
        playerId: string;
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
    type: "EDIT_TEAM_NAME";
    payload: {
      teamId: TeamSide;
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

  | {
    type: "EDIT_PLAYER";
    payload: {
      teamId: TeamSide;
      playerId: string;
      name: string;
    };
  }