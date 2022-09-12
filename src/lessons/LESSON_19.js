import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useQuery, useQueryClient } from "react-query";

async function fetchPosts() {
  const posts = await (
    await axios.get(`https://jsonplaceholder.typicode.com/posts`)
  ).data;
  return posts;
}

function Posts() {
  const postsQuery = useQuery("posts", fetchPosts, {
    staleTime: Infinity,
  });

  return (
    <div>
      <div>
        <h1>Posts {postsQuery.isFetching ? "......" : null}</h1>
        {postsQuery.isLoading ? (
          "Loading posts..."
        ) : (
          <ul>
            {postsQuery.data.slice(0, 5).map((post) => {
              return <li key={post.id}>{post.title}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export function LESSON_19() {
  const queryClient = useQueryClient();
  const [show, toggle] = useReducer((d) => !d, false);

  /**
   * prefetch a query if it's likely going to be used.
   */

  useEffect(() => {
    queryClient.prefetchQuery("posts", fetchPosts);
  }, []);

  return (
    <div>
      <button onClick={toggle}>{show ? "Hide posts" : "Show"}</button>
      {show ? <Posts /> : null}
    </div>
  );
}
