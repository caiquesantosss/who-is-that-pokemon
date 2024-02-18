import React from 'react';

const Types = ({ DataPoke }) => {
  if (!DataPoke || !DataPoke.types) {
    return null; 
  }

  // Transforma o objeto DataPoke em uma matriz de tipos de Pokémon
  const pokemonTypes = Object.values(DataPoke.types);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center p-4">
      {pokemonTypes.map((type, index) => (
        <div
          key={index}
          className={`flex justify-center items-center w-32 h-12 ${
            index === 0 ? 'bg-blue-500' : 'bg-red-500'
          } text-white mr-4 rounded-lg`}
        >
          {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default Types;
