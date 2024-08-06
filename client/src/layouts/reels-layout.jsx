import React from "react";
import Sidebar from "@/components/common/sidebar";
import Header from "@/components/common/small-deivce-header";
import { SpinnerLoader } from "@/components/common/loader";

const ReelsLayout = ({ children }) => {
  return (
    <div>
      <div>
        <div className="max-sm:hidden">
          <Sidebar />
          <Header />
        </div>

        <div className="w-[100%] sm:pl-[100px] lg:pl-[350px] max-sm:h-screen max-sm:px-0 max-sm:mt-[0px] sm:px-10 sm:py-8">
          <React.Suspense
            fallback={
              <div className="h-screen flex items-center justify-center w-full bg-black/0">
                <SpinnerLoader />
              </div>
            }
          >
            {children}
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default ReelsLayout;
