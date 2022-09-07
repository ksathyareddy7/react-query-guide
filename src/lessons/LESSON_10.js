import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function PokemonSearch({ pokemon }) {
  const queryInfo = useQuery(
    ["pokemon", pokemon],
    ({ signal }) => {
      const source = axios.CancelToken.source();

      const promise = new Promise((resolve) => setTimeout(resolve, 1000)).then(
        () => {
          return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
              cancelToken: source.token,
            })
            .then((res) => res.data);
        }
      );
      /**
       * this will cancel the ongoing request if there is a new request.
       */
      signal?.addEventListener("abort", () => {
        source.cancel("Query was cancelled by React Query");
      });

      return promise;
    },
    {
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

export function LESSON_10() {
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
