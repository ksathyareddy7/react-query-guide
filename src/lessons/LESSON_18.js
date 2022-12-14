import axios from "axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

function Posts({ subkey }) {
  const postsQuery = useQuery(
    ["posts", subkey],
    async () => {
      const posts = await (await axios.get(`http://localhost:3005/posts`)).data;
      return posts;
    },
    {
      staleTime: Infinity,
    }
  );

  return (
    <div>
      <div>
        <h1>
          Posts {subkey} {postsQuery.isFetching ? "......" : null}
        </h1>
        {postsQuery.isLoading ? (
          "Loading posts..."
        ) : (
          <ul>
            {postsQuery.data.slice(0, 3).map((post) => {
              return <li key={post.id}>{post.title}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export function LESSON_18() {
  const queryClient = useQueryClient();

  return (
    <div>
      <button
        className="btn btn-primary mx-2  mb-4"
        onClick={() => queryClient.invalidateQueries("posts")}
      >
        Invalidate Queries
      </button>
      <button
        className="btn btn-primary mx-2  mb-4"
        onClick={() => queryClient.invalidateQueries(["posts", "A"])}
      >
        Invalidate A
      </button>
      <button
        className="btn btn-primary mx-2  mb-4"
        onClick={() => queryClient.invalidateQueries(["posts", "B"])}
      >
        Invalidate B
      </button>
      <button
        className="btn btn-primary mx-2  mb-4"
        onClick={() => queryClient.invalidateQueries(["posts", "C"])}
      >
        Invalidate C
      </button>

      <Posts subkey="A" />
      <Posts subkey="B" />
      <Posts subkey="C" />
    </div>
  );
}
