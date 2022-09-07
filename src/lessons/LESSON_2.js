import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export function LESSON_2() {
  /**
   * Handling error from API.
   */
  const queryInfo = useQuery("pokemon", async () => {
    // simulating 1 second response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // We will be throwing a manual error to simulate real world case.
    throw new Error("Simulated Error");
    return axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results)
      .catch(console.log);
  });

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
    </div>
  );
}
