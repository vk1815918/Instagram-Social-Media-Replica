import {Suspense} from "react";
import { Outlet } from "react-router-dom";
import { SpinnerLoader } from "@/components/common/loader";
const AccountLayout = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center w-full bg-black/0">
            <div className="h-[100px] w-[100px] py-4">
              <SpinnerLoader />
            </div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AccountLayout;
