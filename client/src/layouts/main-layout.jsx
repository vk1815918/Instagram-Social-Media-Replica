import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "@/components/common/sidebar";
import SmallDeviceHeader from "@/components/common/small-deivce-header";
import { SpinnerLoader } from "@/components/common/loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/pages/error/error-page";
import SmallDeviceMenu from "@/components/common/small-device-menu";

const MainLayout = () => {
  return (
    <div className="">
      <div>
        <SmallDeviceHeader />
        <SideBar />
        <SmallDeviceMenu />
      </div>

      <div className="w-[100%] sm:pl-[100px] lg:pl-[350px] h-fit  max-sm:pb-[90px] max-sm:mt-[65px] sm:px-10 sm:py-8">
        <React.Suspense
          fallback={
            <div className="w-full h-[60vh] sm:h-[100vh] flex items-center justify-center bg-black">
              <SpinnerLoader />
            </div>
          }
        >
          <ErrorBoundary FallbackComponent={ErrorPage}>
            <Outlet />
          </ErrorBoundary>
        </React.Suspense>
      </div>
    </div>
  );
};

export default MainLayout;
