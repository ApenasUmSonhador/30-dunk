"use client";

import { useGame } from "@/context/GameContext";

export function GameControls() {
  const { state, dispatch } = useGame();

  const minutes = Math.floor(
    state.clock.timeLeft / 60
  );

  const seconds =
    state.clock.timeLeft % 60;

  return (
    <div className="bg-white text-black shadow-lg rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:justify-between lg:items-center">
        
        {/* Display do relógio */}
        <div>
          <h2 className="text-3xl font-bold">
            {state.clock.currentPeriod}° Tempo
          </h2>

          <div className="text-4xl md:text-5xl font-bold">
            {String(minutes).padStart(2, "0")}
            :
            {String(seconds).padStart(2, "0")}
          </div>
        
          {state.clock.isFinished && (
            <div className="text-2xl text-red-500 font-bold">
              Partida encerrada
            </div>
          )}

        </div>

        {/* Controles do jogo */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
            onClick={() =>
              dispatch({
                type: "START_CLOCK",
              })
            }
          >
            Start
          </button>

          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
            onClick={() =>
              dispatch({
                type: "PAUSE_CLOCK",
              })
            }
          >
            Pause
          </button>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={() =>
              dispatch({
                type: "NEXT_PERIOD",
              })
            }
          >
            Next Period
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
            onClick={() =>
              dispatch({
                type: "END_GAME",
              })
            }
          >
            End Game
          </button>

          <button
            className="bg-black text-white px-4 py-2 rounded w-full"
            onClick={() => {
              if (
                confirm("Deseja reiniciar a partida?")
              ) {
                dispatch({
                  type: "RESET_GAME",
                });
              }
            }}
          >
            Reset
          </button>
          
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded w-full"
            onClick={() =>
                dispatch({
                type: "UNDO",
                })
            }
            >
            Undo
          </button>

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded w-full"
            onClick={() =>
                dispatch({
                type: "REDO",
                })
            }
            >
            Redo
          </button>
        
        </div>
      </div>
    </div>
  );
}