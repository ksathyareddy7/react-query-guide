import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export function LESSON_3() {
  /**
   * useQuery takes configuration object as third parameter.
   */
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
       * comment out below line to refetch data in background when window is focused.
       * open react query devtools to watch request states changing.
       *
       * By default this is TRUE.
       */
      refetchOnWindowFocus: false,
    }
  );

  // THIS IS ANOTHER WAY TO CHECK STATUS USING PREDEFINED STRING STATES IN REACT-QUERY
  // show a loading state while the data is fetched
  if (queryInfo.status === "loading") {
    return <div>Loading data...</div>;
  }
  // show error message if any error occurs
  if (queryInfo.status === "error") {
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
