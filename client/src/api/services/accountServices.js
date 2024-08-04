import api from "../index";

const accountServices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccountProfile: builder.query({
      query: (username) => ({
        url: `/account/${username}`,
      }),
      providesTags: ["otherUserAccount"],
    }),
    followAccount: builder.mutation({
      query: (accountId) => ({
        url: `/account/${accountId}/follow`,
        method: "POST",
      }),
      invalidatesTags: [
        "checkFollowingStatus",
        "profile",
        "otherUserAccount",
        "following",
        "followers",
      ],
    }),
    unFollowAccount: builder.mutation({
      query: (accountId) => ({
        url: `/account/${accountId}/unfollow`,
        method: "POST",
      }),
      invalidatesTags: [
        "checkFollowingStatus",
        "profile",
        "otherUserAccount",
        "following",
        "followers",
      ],
    }),
    checkFollowingStatus: builder.query({
      query: (id) => ({
        url: `/account/${id}/checkFollowingStatus`,
      }),
      providesTags: ["checkFollowingStatus"],
    }),
    getFollowers: builder.query({
      query: ({ username, searchQuery }) => ({
        url: `/account/${username}/followers?searchQuery=${searchQuery}`,
      }),
      providesTags: ["followers"],
    }),
    getFollowing: builder.query({
      query: ({ username, searchQuery }) => ({
        url: `/account/${username}/following?searchQuery=${searchQuery}`,
      }),
      providesTags: ["following"],
    }),
    getFollowersFollowing: builder.query({
      query: () => `/account/followers-following`,
    }),
  }),
});

export const {
  useCheckFollowingStatusQuery,
  useFollowAccountMutation,
  useUnFollowAccountMutation,
  useGetAccountProfileQuery,
  useLazyGetFollowersQuery,
  useGetFollowingQuery,
  useGetFollowersQuery,
  useGetFollowersFollowingQuery,
} = accountServices;
