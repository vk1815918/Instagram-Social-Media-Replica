import api from "../index.js";

const commentServieces = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostComment: builder.query({
      query: (postId) => ({
        url: `/post/${postId}/comment`,
      }),
      providesTags: ["comments"],
    }),
    postComment: builder.mutation({
      query: ({ postId, text, gifUrl }) => ({
        url: `/post/${postId}/comment`,
        method: "POST",
        body: { text, gifUrl },
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useLazyGetPostCommentQuery,
  usePostCommentMutation,
  useGetPostCommentQuery,
} = commentServieces;
