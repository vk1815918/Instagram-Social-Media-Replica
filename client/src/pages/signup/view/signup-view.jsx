import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { InputPrimary } from "../../../components/common/input";
import { useSignupMutation } from "../../../api/services/authServices.js";
import { useNavigate } from "react-router-dom";

const SignupView = () => {
  const [usernameLabel, setUsernameLabel] = useState(false);
  const [passwordLabel, setPasswordLabel] = useState(false);
  const [fullnameLabel, setFullnameLabel] = useState(false);
  const [emailLabel, setEmailLabel] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [postSignup, { data, isLoading }] = useSignupMutation();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim());
    if (e.target.value.length >= 1) {
      setUsernameLabel(true);
    } else {
      setUsernameLabel(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
    if (e.target.value.length >= 1) {
      setEmailLabel(true);
    } else {
      setEmailLabel(false);
    }
  };
  const handleFullnameChange = (e) => {
    setFullName(e.target.value.trim());
    if (e.target.value.length >= 1) {
      setFullnameLabel(true);
    } else {
      setFullnameLabel(false);
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
    if (e.target.value.length >= 1) {
      setPasswordLabel(true);
    } else {
      setPasswordLabel(false);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!username || !password || !email || !fullName) {
      return alert("All field are mandatoty");
    }
    const userData = { username, password, email, fullName };

    try {
      const res = await postSignup(userData).unwrap();
      if (res.status === "success") {
        alert(res.message);
        navigate("/login");
        return;
      }
    } catch (error) {
      console.log("error", error);
      if (error.data.type === "ValidationError") {
        alert("Validation Error");
        return;
      }
      alert(error.data.message);
    }
  };
  return (
    <div className="py-2 w-full min-h-screen flex gap-4 items-center justify-center text-white">
      <div className="min-h-full max-sm:mx-auto max-sm:w-[90%] w-[340px]">
        <div className="w-full">
          <div className="w-full h-fit flex flex-col gap-2">
            {/* ----------Form Container---------*/}
            <div className="pb-4 w-full h-fit border border-[#c7c7c7]  border-opacity-60">
              <div className="w-full flex flex-col pt-10 px-6">
                <header className="w-full flex justify-center">
                  <img
                    src="/assets/i-logo-2.jpg"
                    alt=""
                    className="w-[180px]"
                  />
                </header>

                <div className="w-full flex flex-col gap-2 py-4">
                  <span className="text-center text-md">
                    Signup to see photos and video from your freinds
                  </span>
                  <div className=" flex justify-center btn-primary">
                    <a
                      href="#"
                      className=" text-[12px] cursor-pointer text-center hover:text-white transition flex space-x-2 items-center"
                    >
                      <span>
                        <FaFacebook />
                      </span>
                      <span>Signup with facebook</span>
                    </a>
                  </div>

                  {/* ----- OR -----  */}
                  <div className="flex gap-4 items-center">
                    <span className="flex-1 w-full h-[1px] bg-cool-white/60"></span>
                    <span className="text-sm"> OR</span>
                    <span className="flex-1 w-full h-[1px] bg-cool-white/60"></span>
                  </div>
                </div>

                {/* --------Form----------- */}
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <InputPrimary
                    label="Username"
                    labelType={usernameLabel}
                    onChange={handleUsernameChange}
                    type="text"
                  />
                  <InputPrimary
                    label={"Full Name"}
                    labelType={fullnameLabel}
                    onChange={handleFullnameChange}
                    type="text"
                  />
                  <InputPrimary
                    label={"Email"}
                    labelType={emailLabel}
                    onChange={handleEmailChange}
                    type="email"
                  />
                  <InputPrimary
                    label={"Password"}
                    labelType={passwordLabel}
                    onChange={handlePasswordChange}
                    type="password"
                  />
                  <div className="w-full mt-1">
                    <button
                      className="btn-primary w-full text-sm"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* -------Second Container-------- */}
            <div></div>
            {/* -------Third Container-------- */}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
