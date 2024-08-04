import api from "../index.js";

const othersServices = api.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: (query) => ({
        url: `/search/user/?q=${query}`,
      }),
    }),
    explore: builder.query({
      query: () => ({
        url: `/explore`,
      }),
    }),
    getSuggestedAccounts: builder.query({
      query: (limit) => ({
        url: `/suggested?limit=${limit}`,
      }),
    }),
    getGIfs: builder.query({
      query: ({ query, limit }) => ({
        url: `/gifs?limit=${limit}&q=${query}`,
      }),
    }),
  }),
});

export const {
  useLazySearchQuery,
  useExploreQuery,
  useGetSuggestedAccountsQuery,
  useGetGIfsQuery,
} = othersServices;
