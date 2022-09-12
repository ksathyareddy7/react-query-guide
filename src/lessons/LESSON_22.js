/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { CreatePost } from "./CreatePost";

const URL = `http://localhost:3005/posts`;

export function LESSON_22() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery("posts", async () => {
    const posts = await (await axios.get(URL)).data;
    return posts;
  });

  const mutation = useMutation(
    (values) => {
      return axios.post(URL, values);
    },
    {
      onSuccess: (data, values) => {
        /**
         * invalidates POSTS query to refetch it
         */
        // queryClient.invalidateQueries("posts");
        /**
         * update the cache data for faster update and later invalidate query
         */
        const oldData = queryClient.getQueryData("posts");
        queryClient.setQueryData("posts", [...oldData, data.data]);
        queryClient.invalidateQueries("posts");
      },
    }
  );

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? "..." : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          "Loading posts..."
        ) : (
          <ul>
            {postsQuery.data?.map((post) => {
              return (
                <li key={post.id}>
                  <a href="#">{post.title}</a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <hr />
      <CreatePost
        onSubmit={mutation.mutate}
        buttonText={mutation.isLoading ? "Saving.." : "Create Post"}
      />
    </div>
  );
}
