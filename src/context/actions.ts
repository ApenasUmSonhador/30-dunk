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
    };