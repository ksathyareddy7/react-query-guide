import axios from "axios";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

function Posts() {
  const postsQuery = useQuery(
    "posts",
    async () => {
      const posts = await (
        await axios.get(`https://jsonplaceholder.typicode.com/posts`)
      ).data;
      return posts;
    },
    {
      staleTime: Infinity,
    }
  );

  return (
    <div>
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
      </div>
    </div>
  );
}

export function LESSON_17() {
  const [isHidden, setIsHidden] = useState(false);
  const queryClient = useQueryClient();

  /**
   * invalidates specified queries and refetch INACTIVE queries.
   */
  const invalidateQuery = () => {
    queryClient.invalidateQueries("posts", { refetchInactive: true });
  };

  return (
    <div>
      <h1>Posts </h1>
      <button onClick={() => setIsHidden((val) => !val)}>
        {isHidden ? "Show" : "Hide"}
      </button>
      <button onClick={invalidateQuery}>Invalidate Query</button>
      <div>{isHidden ? null : <Posts />}</div>
    </div>
  );
}
