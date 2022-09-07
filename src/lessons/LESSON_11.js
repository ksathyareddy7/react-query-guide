import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const email = "Sincere@april.biz";

function MyPosts() {
  const userQuery = useQuery("user", async () => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then((res) => res.data[0])
      .catch(console.log);
  });

  /**
   * dependent query starts in IDLE state not in LOADING.
   */

  const postsQuery = useQuery(
    "posts",
    () => {
      return axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userQuery.data.id}`
        )
        .then((res) => res.data);
    },
    {
      enabled: Boolean(userQuery.data?.id),
    }
  );

  if (userQuery.isLoading) {
    return <div>Loading data...</div>;
  }

  if (userQuery.isError) {
    return <div>Error: {userQuery.error.message}</div>;
  }
  return (
    <div>
      <p>User Id: {userQuery.data.id}</p>
      <br />
      <br />
      {postsQuery.isIdle ? null : postsQuery.isLoading ? (
        "Loading posts..."
      ) : (
        <p>Post count: {postsQuery.data.length}</p>
      )}
    </div>
  );
}

export function LESSON_11() {
  return (
    <div>
      <MyPosts />
    </div>
  );
}
