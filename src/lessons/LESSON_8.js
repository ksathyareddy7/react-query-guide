import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function PokemonSearch({ pokemon }) {
  const queryInfo = useQuery(
    /**
     * we can pass an array of keys to group data.
     */
    ["pokemon", pokemon],
    async () => {
      // simulating 1 second response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.data)
        .catch(console.log);
    },
    {
      /**
       * the query will fire only when pokemon value exists.
       * it should be a boolean value.
       */
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

export function LESSON_8() {
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
