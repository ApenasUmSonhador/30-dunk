import { GameState } from "@/types/game";

// MVP - Most Valuable Player
export function getTopScorer(
  state: GameState
) {
  const allPlayers = [
    ...state.teams.home.players,
    ...state.teams.away.players,
  ];

  if (allPlayers.length === 0) {
    return null;
  }

  return allPlayers.reduce((best, current) =>
    current.points > best.points
      ? current
      : best
  );
}

// Get the winner of the game based on the current score
export function getWinner(
  state: GameState
) {
  const home =
    state.teams.home.score;

  const away =
    state.teams.away.score;

  if (home === away) {
    return "Empate";
  }

  return home > away
    ? state.teams.home.name
    : state.teams.away.name;
}

export function getPointsByPeriod(
  state: GameState
) {
  const periods = [1, 2, 3, 4];

  return periods.map((period) => {
    const events =
      state.scoreEvents.filter(
        (event) =>
          event.period === period
      );

    const total = events.reduce(
      (sum, event) =>
        sum + event.points,
      0
    );

    return {
      period,
      total,
    };
  });
}