import api from "..";
const postServices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (page) => ({
        url: `/post?page=${page}`,
      }),
      providesTags: ["Posts"],
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/post/single/${id}`,
      }),
      providesTags: ["SinglePost"],
    }),
    createPost: builder.mutation({
      query: (fd) => ({
        url: "/post",
        method: "POST",
        body: fd,
      }),
      invalidatesTags: ["Profile", "Posts", "myposts"],
    }),
    getMyPosts: builder.query({
      query: () => ({
        url: "/post/my",
      }),
      providesTags: ["myposts"],
    }),
    getUserPosts: builder.query({
      query: (username) => ({
        url: `/post/user/${username}`,
      }),
    }),
    getAllReels: builder.query({
      query: () => ({
        url: `/post/reels`,
      }),
      providesTags: ["reels"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myposts", "Profile", "Posts"],
    }),
    toggleLike: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}/toggleLike`,
        method: "POST",
      }),
      invalidatesTags: ["Posts", "SinglePost", "reels"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useGetMyPostsQuery,
  useGetUserPostsQuery,
  useDeletePostMutation,
  useToggleLikeMutation,
  useGetAllReelsQuery,
} = postServices;
