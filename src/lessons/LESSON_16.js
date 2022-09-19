import axios from "axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

export function LESSON_16() {
  const queryClient = useQueryClient();
  const postsQuery = useQuery(
    "posts",
    async () => {
      const posts = await (await axios.get(`http://localhost:3005/posts`)).data;
      return posts;
    },
    {
      /**
       * refetches the query after specified interval in the background
       */
      // refetchInterval: 3000,
      /**
       * keeps query always FRESH
       */
      staleTime: Infinity,
    }
  );
  /**
   * invalidates specified queries and refetches them.
   */
  const invalidateQuery = () => {
    queryClient.invalidateQueries("posts");
    // this will mark always FRESH queries to STALE and will be refetched when used again
    /* queryClient.invalidateQueries("posts", {
      refetchActive: false,
    }); */
  };

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? "....." : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          "Loading posts..."
        ) : (
          <ul>
            {postsQuery.data.slice(0, 10).map((post) => {
              return <li key={post.id}>{post.title}</li>;
            })}
          </ul>
        )}
        <button onClick={invalidateQuery}>Invalidate Query</button>
      </div>
    </div>
  );
}
