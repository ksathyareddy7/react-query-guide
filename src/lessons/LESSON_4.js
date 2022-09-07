import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export function LESSON_4() {
  const queryInfo = useQuery(
    "pokemon",
    async () => {
      // simulating 1 second response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results)
        .catch(console.log);
    },
    {
      /**
       * react query marks all the queries as STALE as soon as it finishes fetching them.
       * the query will be FRESH for the time specified then it will be marked as STALE and
       * it will be refetched as soon as window comes into focus.
       *
       * By default this is 0
       */
      staleTime: 5000, // 5 seconds
      //staleTime: Infinity // always FRESH
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
      {/*optional chaining as data doesn't exists when component mounts*/}
      {queryInfo.data?.map((pokemon) => {
        return <p key={pokemon.name}>{pokemon.name}</p>;
      })}
      <br />
      <h2>
        Data fetching in background: {queryInfo.isFetching ? "YES" : "NO"}
      </h2>
    </div>
  );
}
