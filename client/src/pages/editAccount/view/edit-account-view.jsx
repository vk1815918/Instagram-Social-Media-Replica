import React, { useEffect, useState } from "react";
import { useUpdateProfileInfoMutation } from "@/api/services/profileServices.js";
import { toast } from "react-toastify";
import AvatarSection from "../_components/avatar-section";
import useAuth from "@/hooks/use-auth";

const EditAccountView = () => {
  const [profileInfo, setProfileInfo] = useState({
    website: "",
    gender: "",
    bio: "",
    privacy: "",
    accountType: "",
  });
  const { user: currentUser } = useAuth();
  const [editProfileInfoBtnDisable, setEditProfileInfoBtnDisable] =
    useState(true);

  const [updateProfileInfo] = useUpdateProfileInfoMutation();

  useEffect(() => {
    setProfileInfo((prev) => {
      return {
        ...prev,
        website: currentUser?.website,
        gender: currentUser?.gender,
        bio: currentUser?.bio,
        privacy: currentUser?.privacy,
        accountType: currentUser?.accountType,
      };
    });
  }, [currentUser]);

  const handleUpdateProfileInfo = async () => {
    try {
      const res = await updateProfileInfo(profileInfo).unwrap();
      toast.dark(res.message);
    } catch (err) {
      console.log(err);
    }
  };
  const handleProfileInfosChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (editProfileInfoBtnDisable === true) {
      setEditProfileInfoBtnDisable(false);
    }

    setProfileInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <div className="w-full px-3 max-sm:pb-20">
        <div className="w-full sm:w-1/2 flex flex-col">
          <header className="text-[21px] font-semibold">Edit Profile</header>

          <main className="flex flex-col mt-5 w-full space-y-4">
            {/* Avatar Section */}
            <AvatarSection />
            {/* Website input Section */}
            <div>
              <header className="text-md font-semibold">Website</header>
              <div className="w-full bg-[#424242] h-fit rounded-md flex items-cente px-4">
                <input
                  type="text"
                  className="bg-red/0 py-3 w-full text-md"
                  placeholder="Website"
                  name="website"
                  value={profileInfo.website} 
                  onChange={handleProfileInfosChange}
                />
              </div>
            </div>

            {/* Bio Section */}
            <div>
              <header className="text-md font-semibold">Bio</header>
              <div className="w-full bg-[#1b1b1b] h-fit rounded-md flex items-cente px-4">
                <textarea
                  className="bg-red/0 py-3 w-full text-md max-h-[200px] resize-none"
                  placeholder="Your Bio Text"
                  name="bio"
                  value={profileInfo.bio}
                  onChange={handleProfileInfosChange}
                ></textarea>
              </div>
            </div>

            {/* Gender Section */}
            <div>
              <header className="text-md font-semibold">Gender</header>
              <div className="w-full  h-fit rounded-md">
                <select
                  className="w-full py-3 px-4 bg-[#1b1b1b]"
                  name="gender"
                  onChange={handleProfileInfosChange}
                  value={profileInfo.gender}
                  defaultChecked={""}
                >
                  <option value="" className="bg-black">
                    Not selected
                  </option>
                  <option value="male" className="bg-black">
                    Male
                  </option>
                  <option value="female">Female</option>
                </select>
              </div>
              <span className="text-white/60 text-xs">
                This won't be part of your profile.
              </span>
            </div>

            {/* Account Type Section */}
            <div>
              <header className="text-md font-semibold">Account Type</header>
              <div className="w-full  h-fit rounded-md">
                <select
                  className="w-full py-3 px-4 bg-[#1b1b1b]"
                  name="accountType"
                  onChange={handleProfileInfosChange}
                  value={profileInfo.accountType}
                >
                  <option value="personal" className="bg-black">
                    Personal
                  </option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>

            {/* Privacy Section */}
            <div>
              <header className="text-md font-semibold">Privacy</header>
              <div className="w-full  h-fit rounded-md">
                <select
                  name="privacy"
                  className="w-full py-3 px-4 bg-[#1b1b1b]"
                  onChange={handleProfileInfosChange}
                  value={profileInfo.privacy}
                >
                  <option value="public" className="bg-black">
                    Public
                  </option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="py-6 w-full flex justify-end">
              <button
                className={`btn-primary py-1 px-20 max-sm:w-full ${
                  editProfileInfoBtnDisable && "opacity-50 cursor-not-allowed"
                }`}
                onClick={handleUpdateProfileInfo}
                disabled={editProfileInfoBtnDisable}
              >
                Submit
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EditAccountView;
