import { updateNotifications } from "@/store/slices/notificationSlice";
import api from "../index";

const notificationsService = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/notifications",
      }),
      providesTags: ["notifications"],

      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          dispatch(updateNotifications({ status: "loading" }));
          const notifications = (await queryFulfilled).data;
          const unreadNotifications = notifications?.filter((n) => {
            return n?.status === "unread";
          });

          dispatch(
            updateNotifications({
              notifications: notifications,
              status: "success",
              unread: unreadNotifications.length,
            })
          );
        } catch (error) {
          dispatch(
            updateNotifications({
              notifications: null,
              status: "faild",
            })
          );
        }
      },
    }),
    makeAsReadNotifications: builder.mutation({
      query: () => ({
        url: "/notifications/makeAsRead",
        method: "PUT",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMakeAsReadNotificationsMutation,
} = notificationsService;
