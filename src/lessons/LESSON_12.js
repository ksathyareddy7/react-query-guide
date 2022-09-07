import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { existingUser } from "../data/existingUser";

const email = "Sincere@april.biz";

function MyPosts() {
  /**
   * we can provide initial data if we have, it will skip the loading state and fetch
   * latest data in the background.
   */
  const userQuery = useQuery(
    "user",
    async () => {
      // simulating 1 second response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then((res) => res.data[0])
        .catch(console.log);
    },
    {
      initialData: existingUser,
    }
  );

  if (userQuery.isLoading) {
    return <div>Loading data...</div>;
  }

  if (userQuery.isError) {
    return <div>Error: {userQuery.error.message}</div>;
  }
  return <pre>{JSON.stringify(userQuery.data, null, 4)}</pre>;
}

export function LESSON_12() {
  return (
    <div>
      <MyPosts />
    </div>
  );
}
