import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function PokemonSearch({ pokemon }) {
  const queryInfo = useQuery(
    [pokemon],
    async () => {
      // simulating 1 second response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.data);
    },
    {
      /**
       * the query will retry to fetch the data if request fails for given number of retry.
       * if the error is not caught.
       *
       * DEFAULT RETRY VALUE IS 4.
       */
      retry: 1,
      /**
       * delay between each retry
       */
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      enabled: Boolean(pokemon),
    }
  );

  if (queryInfo.isLoading) {
    return <div>Loading data...</div>;
  }

  if (queryInfo.isError) {
    return <div>Error: {queryInfo.error.message}</div>;
  }
  return (
    <div>
      {queryInfo.data?.sprites?.front_default ? (
        <img src={queryInfo.data.sprites.front_default} alt="pokmon" />
      ) : (
        "No pokemon found"
      )}
      <br />
    </div>
  );
}

export function LESSON_9() {
  const [pokemon, setPokemon] = useState("");
  return (
    <div>
      <input
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
        placeholder="pokemon name"
      />
      <PokemonSearch pokemon={pokemon} />
    </div>
  );
}
