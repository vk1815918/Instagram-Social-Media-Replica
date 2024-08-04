import { lazy } from "react";
// Importing Hooks👇🏼
import { useRoutes, Navigate } from "react-router-dom";
// Importing Layouts👇🏼
import MainLayout from "../layouts/main-layout";
import ReelsLayout from "../layouts/reels-layout.jsx";
// Importing pages using lazy render 👇🏼
const HomePage = lazy(() => import("../pages/Home/home-page.jsx"));
const LoginPage = lazy(() => import("../pages/login/login-page.jsx"));
const SignupPage = lazy(() => import("../pages/signup/signup-page.jsx"));
const ProfilePage = lazy(() => import("../pages/profile/profile-page.jsx"));
const ReelsPage = lazy(() => import("../pages/reels/reels-page.jsx"));
const ExplorePage = lazy(() => import("../pages/explore/explore-page.jsx"));
import StoriesPage from "@/pages/stories/stories-page";

// UseAuth
import useAuth from "@/hooks/use-auth";
import NotFoundPage from "@/pages/not-found-page";
import SinglePostPage from "@/pages/single-post/single-post-page";

const EditAccountPage = lazy(() =>
  import("../pages/editAccount/edit-account-page.jsx")
);
const NotificationsPage = lazy(() =>
  import("../pages/notifications/notifications-page.jsx")
);

// Config for all routes👇🏼
const Routes = () => {
  const { isLoggedIn } = useAuth();

  return useRoutes([
    {
      element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        {
          element: isLoggedIn ? <HomePage /> : <Navigate to="/login" />,
          path: "/",
        },
        {
          element: isLoggedIn ? <NotFoundPage /> : <Navigate to="/login" />,
          path: "*",
        },
        {
          element: isLoggedIn ? <StoriesPage /> : <Navigate to="/login" />,
          path: "/stories",
        },
        {
          element: isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />,
          path: "/:username",
        },
        {
          element: isLoggedIn ? <SinglePostPage /> : <Navigate to="/login" />,
          path: "/p/:postId",
        },
        {
          path: "/accounts",
          children: [
            {
              element: isLoggedIn ? (
                <EditAccountPage />
              ) : (
                <Navigate to="/login" />
              ),
              path: "edit",
            },
          ],
        },
        {
          element: isLoggedIn ? <ExplorePage /> : <Navigate to="/login" />,
          path: "/explore/",
        },
        {
          element: isLoggedIn ? (
            <NotificationsPage />
          ) : (
            <Navigate to="/login" />
          ),
          path: "/notifications/",
        },
      ],
    },

    {
      path: "/reels/",
      element: isLoggedIn ? (
        <ReelsLayout>
          <ReelsPage />
        </ReelsLayout>
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      element: isLoggedIn ? <Navigate to="/" /> : <LoginPage />,
      path: "/login",
    },
    {
      element: isLoggedIn ? <Navigate to="/" /> : <SignupPage />,
      path: "/signup",
    },
  ]);
};

export default Routes;
