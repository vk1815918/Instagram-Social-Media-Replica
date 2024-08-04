import ProfileAuthorview from "./view/profile-auth-view";
import ProfileUserView from "./view/profile-user-view";
import { useParams } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import { SpinnerLoader } from "@/components/common/loader";

const ProfilePage = () => {
  const { isLoading, user, isFaild } = useAuth();

  let { username: reqUsername } = useParams();

  if (isLoading) {
    return (
      <div className="w-full mt-10 flex items-center justify-center">
        <SpinnerLoader  />
      </div>
    );
  }

  if (isFaild) {
    return (
      <div className="w-full mt-10 flex items-center justify-center">
        <h2>Some thing went wrong please try agian</h2>
      </div>
    );
  }

  return (
    <div className="">
      {reqUsername === user?.username ? (
        <ProfileAuthorview />
      ) : (
        <ProfileUserView username={reqUsername} />
      )}
    </div>
  );
};

export default ProfilePage;
