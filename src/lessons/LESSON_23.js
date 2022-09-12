/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { CreatePost } from "./CreatePost";

const URL = `http://localhost:3005/posts`;

export function LESSON_23() {
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
      /**
       * triggers as soon as mutate function is called.
       */
      onMutate: (values) => {
        // cancel if any active requests exists
        queryClient.cancelQueries("posts");
        // take a snapshot of the data
        const oldPosts = queryClient.getQueryData("posts");
        queryClient.setQueryData("posts", (oldData) => {
          return [
            ...oldData,
            {
              id: Date.now(),
              ...values,
            },
          ];
        });
        // whatever returned is passed to other callbacks as rollback value
        return () => queryClient.setQueryData("posts", oldPosts);
      },
      onSettled: () => {
        queryClient.invalidateQueries("posts");
      },
      onError: (error, values, rollback) => {
        if (rollback) {
          rollback();
        }
        alert(error.response.data.message);
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
