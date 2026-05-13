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
    <div className="border rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center">
        
        {/* Display do relógio */}
        <div>
          <h2 className="text-3xl font-bold">
            {state.clock.currentPeriod}° Tempo
          </h2>

          <div className="text-5xl font-bold">
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
        <div className="flex gap-3">

          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() =>
              dispatch({
                type: "START_CLOCK",
              })
            }
          >
            Start
          </button>

          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() =>
              dispatch({
                type: "PAUSE_CLOCK",
              })
            }
          >
            Pause
          </button>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() =>
              dispatch({
                type: "NEXT_PERIOD",
              })
            }
          >
            Next Period
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() =>
              dispatch({
                type: "END_GAME",
              })
            }
          >
            End Game
          </button>

          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() =>
              dispatch({
                type: "RESET_GAME",
              })
            }
          >
            Reset
          </button>
          
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() =>
                dispatch({
                type: "UNDO",
                })
            }
            >
            Undo
          </button>

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
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