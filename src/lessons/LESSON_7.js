import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

/**
 * create hooks to reuse the query
 */

function usePokemonQuery() {
  return useQuery("pokemon", async () => {
    // simulating 1 second response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results)
      .catch(console.log);
  });
}

function Pokemon() {
  const queryInfo = usePokemonQuery();

  if (queryInfo.isLoading) {
    return <div>Loading data...</div>;
  }

  if (queryInfo.isError) {
    return <div>Error: {queryInfo.error.message}</div>;
  }
  return (
    <div>
      {/*optional chaining as data doesn't exists when component mounts*/}
      {queryInfo.data?.map((pokemon) => {
        return <p key={pokemon.name}>{pokemon.name}</p>;
      })}
    </div>
  );
}

function Count() {
  const queryInfo = usePokemonQuery();
  return <h3>You are looking at {queryInfo.data?.length} pokemons</h3>;
}

export function LESSON_7() {
  return (
    <div>
      <Count />
      <Pokemon />
    </div>
  );
}
