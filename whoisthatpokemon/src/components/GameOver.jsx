import React from "react";

const GameOver = ({ gamePoints, DataPoke }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Game Over :(</h1>
      <p className="text-xl">Pontuação: {gamePoints.hit}</p>
      <h3 className="font-bold text-2xl capitalize">{DataPoke.name}</h3>
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
        onClick={() => window.location.reload()}
      >
        Reiniciar
      </button>
    </div>
  );
};

export default GameOver;
