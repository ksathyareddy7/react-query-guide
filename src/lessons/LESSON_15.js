/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useReducer, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = async () => {
  const posts = await (
    await axios.get(`https://jsonplaceholder.typicode.com/posts`)
  ).data;

  return posts;
};

function Posts({ setPostId }) {
  const [count, increment] = useReducer((d) => d + 1, 0);

  /**
   * these callbacks will run for all the instances of POSTS query
   */
  const postsQuery = useQuery("posts", fetchPosts, {
    onSuccess: (data) => {
      increment();
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    },
  });

  return (
    <div>
      <h1>Posts {count}</h1>
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

export function LESSON_15() {
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
