import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function Pokemon() {
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
       * when a query is no longer being used it is marked as INACTIVE and when it is used again
       * react query provides the INACTIVE data and refetches that query in background.
       * we can configure how long the INACTIVE data should be kept with `cacheTime` property
       * after which it is discarded.
       *
       * DEFAULT VALUE IS 5 MINUTES
       */
      cacheTime: 3000, // 3 seconds
      //cacheTime: Infinity, // stays forever
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

export function LESSON_5() {
  const [isHidden, setIsHidden] = useState(false);
  /**
   * OPEN DEVELOPER TOOL TO VIEW THE STATE CHANGES. CLICK HIDE/SHOW.
   */
  return (
    <div>
      <button onClick={() => setIsHidden((val) => !val)}>
        {isHidden ? "show" : "hide"}
      </button>
      {!isHidden && <Pokemon />}
    </div>
  );
}
