import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

export function LESSON_1() {
  /**
   * useQuery is used to fetch data, it takes store key as the first argument to which
   * the data is appended returned by the second argument callback function.
   *
   * The query fires as soon as the component mounts.
   */
  const queryInfo = useQuery("pokemon", () =>
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.data.results)
      .catch(console.log)
  );
  // show a loading state while the data is fetched.
  // There is another way to check state of request which is shown in the second lesson.
  if (queryInfo.isLoading) {
    return <div>Loading data...</div>;
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
