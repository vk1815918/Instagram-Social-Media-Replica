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
      query: ({ postId, text, parentComment, gifUrl }) => ({
        url: `/post/${postId}/comment`,
        method: "POST",
        body: { text, gifUrl, parentComment },
      }),
      invalidatesTags: ["comments"],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/post/${commentId}/comment`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
    toggleCommentLike: builder.mutation({
      query: (commentId) => ({
        url: `/post/${commentId}/comment/toggleLike`,
        method: "PUT",
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useLazyGetPostCommentQuery,
  usePostCommentMutation,
  useGetPostCommentQuery,
  useDeleteCommentMutation,
  useToggleCommentLikeMutation,
} = commentServieces;
