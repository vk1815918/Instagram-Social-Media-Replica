import { clearToken, setToken } from "@/store/slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL + "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.data?.action === "remove_access_token") {
    api.dispatch(clearToken());
    return;
  }

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh_token",
        method: "GET",
      },
      api,
      extraOptions
    );

    // Remove accesstoken if there is an error after trying to get new accessToken from refresh token
    if (refreshResult.error?.status === 401) {
      api.dispatch(clearToken());
    } else {
      const { accessToken } = refreshResult.data;
      api.dispatch(setToken(accessToken));
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const api = createApi({
  reducerPath: "api",
  tagTypes: [
    "Posts",
    "myposts",
    "current_profile",
    "SinglePost",
    "comments",
    "reels",
    "notifications",
    "following",
    "followers",
  ],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default api;
