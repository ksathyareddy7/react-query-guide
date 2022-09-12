/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

async function fetchPosts() {
  const posts = await (
    await axios.get(`https://jsonplaceholder.typicode.com/posts`)
  ).data;
  return posts;
}

async function fetechPost(postId) {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.data);
}

function Posts({ setPostId }) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery("posts", fetchPosts);

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {postsQuery.isLoading ? (
          "Loading posts..."
        ) : (
          <ul>
            {postsQuery.data.slice(0, 10).map((post) => {
              return (
                <li
                  key={post.id}
                  onMouseEnter={() =>
                    queryClient.prefetchQuery(
                      ["post", post.id],
                      () => fetechPost(post.id),
                      {
                        /**
                         * to avoid refetching over and over when hovered
                         */
                        staleTime: Infinity,
                      }
                    )
                  }
                >
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
  const postQuery = useQuery(["post", postId], () => fetechPost(postId));
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

export function LESSON_20() {
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
