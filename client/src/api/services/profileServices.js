import api from "../index.js";
import { setUser } from "../../store/slices/authSlice.js";

const profileServices = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchCurrentProfile: builder.query({
      query: () => ({
        url: "/profile/me",
        method: "GET",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setUser({ status: "loading", data: null }));
        queryFulfilled
          .then((res) => {
            dispatch(setUser({ status: "succeeded", data: res.data }));
          })
          .catch(() => {
            dispatch(setUser({ status: "faild", data: null }));
          });
      },
      providesTags: ["current_profile"],
    }),
    updateProfilePic: builder.mutation({
      query: (fd) => ({
        url: "/profile/me/avatar",
        method: "PUT",
        body: fd,
      }),
      invalidatesTags: ["current_profile"],
    }),
    removeProfilePic: builder.mutation({
      query: () => ({
        url: "/profile/me/avatar",
        method: "DELETE",
      }),
      invalidatesTags: ["current_profile"],
    }),
    updateProfileInfo: builder.mutation({
      query: (body) => ({
        url: "/profile/me/info",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["current_profile"],
    }),
  }),
});

export const {
  useLazyFetchCurrentProfileQuery,
  useUpdateProfilePicMutation,
  useRemoveProfilePicMutation,
  useUpdateProfileInfoMutation,
} = profileServices;
