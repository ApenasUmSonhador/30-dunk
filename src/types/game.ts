export type TeamSide = "home" | "away";

export interface Player {
  id: string;

  name: string;

  points: number;

  onePoint: number;
  twoPoints: number;
  threePoints: number;
}

export interface Team {
  id: TeamSide;

  name: string;

  score: number;

  players: Player[];
}

export interface ClockState {
  currentPeriod: number;

  timeLeft: number;

  isRunning: boolean;

  isFinished: boolean;
}

export interface ScoreEvent {
  id: string;

  playerId: string;

  playerName: string;

  teamId: TeamSide;

  points: 1 | 2 | 3;

  period: number;

  timestamp: number;
}

export interface HistoryItem {
  id: string;

  type: string;

  description: string;

  timestamp: number;
}

export interface GameState {
  teams: {
    home: Team;
    away: Team;
  };

  clock: ClockState;

  history: HistoryItem[];

  scoreEvents: ScoreEvent[];

  undoStack: Snapshot[];
  
  redoStack: Snapshot[];
}

export interface Snapshot {
  teams: GameState["teams"];
  clock: GameState["clock"];
  history: GameState["history"];
  scoreEvents: GameState["scoreEvents"];
}