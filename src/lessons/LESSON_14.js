/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

function Posts({ setPostId }) {
  // get access to react query client
  const queryClient = useQueryClient();

  const postsQuery = useQuery("posts", async () => {
    const posts = await (
      await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    ).data;

    /**
     * set each post data into cache to fetch it if required by other queries.
     */
    posts.forEach((post) => {
      queryClient.setQueryData(["post", post.id], post);
    });

    return posts;
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
  const postQuery = useQuery(["post", postId], async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.data);
  });
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

export function LESSON_14() {
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
