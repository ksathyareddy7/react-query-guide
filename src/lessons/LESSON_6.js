import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

function Pokemon({ queryKey }) {
  const queryInfo = useQuery(queryKey, async () => {
    // simulating 1 second response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results)
      .catch(console.log);
  });

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

export function LESSON_6() {
  /**
   * if different components is using same query then react query will send only one request.
   * change keys to see the difference.
   */
  return (
    <div>
      <h3>Pokemon 1</h3>
      <Pokemon queryKey={"pokemon1"} />
      <h3>Pokemon 2</h3>
      <Pokemon queryKey={"pokemon1"} />
    </div>
  );
}
