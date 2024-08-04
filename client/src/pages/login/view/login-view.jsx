import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { InputPrimary } from "@/components/common/input";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/api/services/authServices.js";
// import { useLazyFetchCurrentProfileQuery } from "@/api/services/profileServices.js";
import { toast } from "react-toastify";
import { setToken } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginView = () => {
  const [usernameLabel, setUsernameLabel] = useState(false);
  const [passwordLabel, setPasswordLabel] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [postLogin] = useLoginMutation();
  // const [fetchCurrentProfile] = useLazyFetchCurrentProfileQuery();
  const dispatch = useDispatch();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim());
    if (e.target.value.length >= 1) {
      setUsernameLabel(true);
    } else {
      setUsernameLabel(false);
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
  const handleSubmit = async () => {
    if (!username || !password) {
      toast.dark("All field are mandatory");
      return;
    }

    const userData = { username, password };
    try {
      const res = await postLogin(userData).unwrap();
      dispatch(setToken(res.accessToken));
      toast.dark(res.message);
      navigate("/dsffd");
    } catch (error) {
      toast.dark(error?.data?.message || "Please try agian");
      console.log(error);
    }
  };

  const handleNavugatteToSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="w-full min-h-screen flex gap-4 items-center justify-center text-white">
      <div className="flex gap-5 w-full md:pl-40 justify-center">
        {/* Image Container */}
        <div className="h-[600px] max-md:hidden">
          <div className="flex w-full relative">
            <img
              src="/assets/images/login-img-1.png"
              className="h-full absolute right-20 bottom-3"
              alt=""
            />
            <img
              src="/assets/images/login-img-1.png"
              className="h-full"
              alt=""
            />
          </div>
        </div>

        <div className="min-h-full max-sm:mx-auto max-sm:w-[90%] w-[340px]">
          <div className="w-full">
            <div className="w-full h-fit flex flex-col gap-2">
              {/* ----------Form Container---------*/}
              <div className="w-full h-fit border border-[#c7c7c7]  border-opacity-60">
                <div className="w-full flex flex-col pt-10 px-5">
                  <header className="w-full flex justify-center">
                    <img
                      src="/assets/i-logo-2.jpg"
                      alt=""
                      className="w-[180px]"
                    />
                  </header>

                  {/* --------Form----------- */}
                  <form
                    className="flex flex-col mt-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <InputPrimary
                      label="Username "
                      labelType={usernameLabel}
                      onChange={handleUsernameChange}
                      type="text"
                    />
                    <InputPrimary
                      label={"Password"}
                      labelType={passwordLabel}
                      onChange={handlePasswordChange}
                      type="password"
                    />
                    <div className="w-full mt-4">
                      <button
                        className="btn-primary w-full text-sm"
                        onClick={handleSubmit}
                      >
                        Log in
                      </button>
                    </div>
                    {/* ----- OR -----  */}
                    <div className="flex gap-4 items-center">
                      <span className="flex-1 w-full h-[1px] bg-cool-white/60"></span>
                      <span className="text-sm"> OR</span>
                      <span className="flex-1 w-full h-[1px] bg-cool-white/60"></span>
                    </div>
                    <div className=" flex justify-center">
                      <a
                        href="#"
                        className=" text-[12px] text-blue cursor-pointer text-center hover:text-white transition flex space-x-2 items-center"
                      >
                        <span>
                          <FaFacebook />
                        </span>
                        <span>Log in with facebook</span>
                      </a>
                    </div>
                    <div className=" flex justify-center">
                      <a
                        href="#"
                        className=" text-[12px] text-blue cursor-pointer text-center hover:text-white transition flex space-x-2 items-center"
                      >
                        <span className=" text-xs text-cool-white cursor-pointer text-center hover:text-white transition flex space-x-2 items-center">
                          Forgot password?
                        </span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>

              {/* -------Second Container-------- */}
              <div className="w-full h-[80px] border border-[#c7c7c7]  border-opacity-60 grid place-items-center">
                <div className="">
                  <div className="text-sm text-white space-x-2 flex">
                    <h3>Don't have an account?</h3>
                    <a
                      className="cursor-pointer text-blue"
                      onClick={handleNavugatteToSignUp}
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
