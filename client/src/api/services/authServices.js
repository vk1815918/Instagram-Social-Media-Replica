import { clearToken, setToken } from "@/store/slices/authSlice.js";
import api from "../index.js";

const authServices = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const response = (await queryFulfilled).data;
          dispatch(setToken(response.accessToken));
        } catch (error) {
          console.log("Login error", error);
        }
      },
      invalidatesTags: ["current_profile", "notifications"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      onQueryStarted: (id, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((data) => {
          if (data.meta.response.status === 200) {
            dispatch(clearToken());
            return;
          }
        });
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation } =
  authServices;
