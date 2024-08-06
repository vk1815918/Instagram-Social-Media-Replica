import { lazy } from "react";
// Importing Hooks👇🏼
import { Navigate, useRoutes } from "react-router-dom";
// Importing Layouts👇🏼
const MainLayout = lazy(() => import("../layouts/main-layout"));
const ReelsLayout = lazy(() => import("../layouts/reels-layout"));

// Importing pages using lazy render 👇🏼
const HomePage = lazy(() => import("../pages/Home/home-page"));
const LoginPage = lazy(() => import("../pages/login/login-page"));
const SignupPage = lazy(() => import("../pages/signup/signup-page"));
const ProfilePage = lazy(() => import("../pages/profile/profile-page"));
const ReelsPage = lazy(() => import("../pages/reels/reels-page"));
const ExplorePage = lazy(() => import("../pages/explore/explore-page"));
const StoriesPage = lazy(() => import("@/pages/stories/stories-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));
const SinglePostPage = lazy(() =>
  import("@/pages/single-post/single-post-page")
);
const EditAccountPage = lazy(() =>
  import("../pages/editAccount/edit-account-page")
);
const NotificationsPage = lazy(() =>
  import("../pages/notifications/notifications-page")
);
// UseAuth
import useAuth from "@/hooks/use-auth";

// Config for all routes👇🏼
const Routes = () => {
  const { isLoggedIn } = useAuth();

  return useRoutes([
    {
      element: isLoggedIn ? <MainLayout /> : <Navigate to={"/login"} />,
      path: '/',
      children: [
        {
          index: true,
          element: isLoggedIn ? <HomePage /> : <Navigate to={"/login"} />,
        },
        {
          path: "*",
          element: isLoggedIn ? <NotFoundPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "stories",
          element: isLoggedIn ? <StoriesPage /> : <Navigate to={"/login"} />,
        },
        {
          path: ":username",
          element: isLoggedIn ? <ProfilePage /> : <Navigate to={"/login"} />,
        },
        {
          path: "p/:postId",
          element: isLoggedIn ? <SinglePostPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "accounts",
          children: [
            {
              path: "edit",
              element: isLoggedIn ? (
                <EditAccountPage />
              ) : (
                <Navigate to="/login" />
              ),
            },
          ],
        },
        {
          path: "/explore/",
          element: isLoggedIn ? <ExplorePage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/notifications/",
          element: isLoggedIn ? (
            <NotificationsPage />
          ) : (
            <Navigate to={"/login"} />
          ),
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
        <Navigate to={"/login"} />
      ),
    },
    {
      element: isLoggedIn ? <Navigate to={"/"} /> : <LoginPage />,
      path: "/login",
    },
    {
      element: isLoggedIn ? <Navigate to={"/"} /> : <SignupPage />,
      path: "/signup",
    },
  ]);
};

export default Routes;
