/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

function Posts({ setPostId }) {
  const postsQuery = useQuery("posts", () => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.data);
  });

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {postsQuery.isLoading ? (
          "Loading posts..."
        ) : (
          <ul>
            {postsQuery.data.map((post) => {
              return (
                <li key={post.id}>
                  <a href="#" onClick={() => setPostId(post.id)}>
                    {post.title}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Post({ postId, setPostId }) {
  // get access to react query client
  const queryClient = useQueryClient();
  // get initial data from the previously loaded data
  const initialData = queryClient
    .getQueryData("posts")
    ?.find((post) => post.id === postId);

  const postQuery = useQuery(
    ["post", postId],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.data);
    },
    {
      initialData,
    }
  );
  return (
    <div>
      <div>
        <a href="#" onClick={() => setPostId(-1)}>
          Back
        </a>
      </div>
      {postQuery.isLoading ? "Loading..." : postQuery.data.title}
    </div>
  );
}

export function LESSON_13() {
  const [postId, setPostId] = useState(-1);
  return (
    <div>
      {postId > -1 ? (
        <Post setPostId={setPostId} postId={postId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </div>
  );
}
