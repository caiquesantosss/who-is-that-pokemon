import { useState, useEffect } from "react";
import axios from "axios";
import GameOver from "./GameOver";
import Types from "./Types";

function Pokemon() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [guessResult, setGuessResult] = useState("");
  const [typeVisible, setTypeVisible] = useState(false);

  const [points, setPoints] = useState({
    hit: 0,
    miss: 0,
  });

  const handleInputChange = (e) => {
    setPokemonName(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pokemonData && pokemonData.name.toLowerCase() === pokemonName) {
      setGuessResult("Parábens, você acertou!");
      setPokemonName("");
      setTypeVisible(false);
      fetchPokemonRandom();
      setPoints((prevPoints) => {
        const updatedHit = prevPoints.hit + 100;
        return { ...prevPoints, hit: updatedHit };
      });
    } else {
      setPoints((prevPoints) => {
        const updateMiss = prevPoints.miss + 1;
        setPokemonName("");
        return { ...prevPoints, miss: updateMiss };
      });
    }
  };

  const handleType = (e) => {
    e.preventDefault();
    setTypeVisible(true);
  };

  const fetchPokemonRandom = async () => {
    try {
      setLoading(true);
      const randomNumber = Math.floor(Math.random() * 250) + 1;
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`
      );
      setPokemonData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      fetchPokemonRandom();
    }

    return () => setMounted(false);
  }, [mounted]);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      {points.miss === 3 ? (
        <GameOver gamePoints={points} DataPoke={pokemonData}/>
      ) : (
        <>
          <div className="absolute top-0 right-0 mr-6 p-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleType}
            >
              Dica?
            </button>
          </div>
          <div className="absolute top-0 left-0 p-4">
            <h2 className="mb-4 text-xl font-bold">Score: {points.hit}</h2>
            <h2
              className={`text-xl font-bold ${
                points.miss === 3
                  ? "text-red-600"
                  : points.miss === 2
                  ? "text-red-500"
                  : points.miss === 1
                  ? "text-red-400"
                  : ""
              }`}
            >
              Chances: {points.miss}
            </h2>
          </div>
          <div className="flex flex-col items-center">
            {loading && <div>Carregando...</div>}
            {!loading && !pokemonData && (
              <div>Nenhum dado encontrado para o Pokémon {pokemonName}.</div>
            )}
            {pokemonData && (
              <div>
                {pokemonData.sprites && (
                  <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                    className={`h-48 w-48 ${
                      loading
                        ? "hidden"
                        : "filter brightness-0 contrast-0 "
                    }`}
                  />
                )}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                name=""
                value={pokemonName}
                id=""
                className="border border-gray-300 rounded-md px-6 mb-4"
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-8"
              >
                Enviar
              </button>
              <p>{guessResult}</p>
            </form>
          </div>
          {typeVisible && <Types DataPoke={pokemonData} />}
        </>
      )}
    </div>
  );
}

export default Pokemon;
