import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/api/services/authServices.js";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "@/components/common/error-message";
import { CustomNavigator } from "@/handler/navigator";
import instagramLogo from "@/assets/logo/i-logo-2.jpg";
import posterImage from "@/assets/images/login-img-1.png";

export const LoginValidationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "solomon",
      password: "123456",
    },
    resolver: yupResolver(LoginValidationSchema),
  });
  const [requestLogin, {isLoading}] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await requestLogin(data).unwrap();
      toast.dark(res.message, {
        className: "dark:bg-black dark:text-white",
      });
      navigate("/");
    } catch (error) {
      toast.dark(error.data.message, {
        className: "dark:bg-black dark:text-white",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex gap-4 items-center justify-center text-white">
      <div className="flex gap-5 w-full md:pl-40 justify-center">
        {/* Image Container */}
        <div className="h-[600px] max-md:hidden">
          <div className="flex w-full relative">
            <img
              src={posterImage}
              className="h-full absolute right-20 bottom-3"
              alt=""
            />
            <img src={posterImage} className="h-full" alt="" />
          </div>
        </div>

        <div className="min-h-full max-sm:mx-auto max-sm:w-[90%] w-[340px]">
          <div className="w-full">
            <div className="w-full h-fit flex flex-col gap-2">
              {/* ----------Form Container---------*/}
              <div className="w-full h-fit border border-[#c7c7c7]  border-opacity-60">
                <div className="w-full flex flex-col pt-10 px-5">
                  <header className="w-full flex flex-col items-center justify-center gap-3">
                    <img src={instagramLogo} alt="" className="w-[180px]" />

                    <h2 className="texdt-center text-sm text-cool-white">
                      Simply hit login to instantly explore the Instagram clone
                      using the pre-filled test credentials.
                    </h2>
                  </header>

                  {/* --------Form----------- */}
                  <form
                    className="flex flex-col mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <input
                          className="px-2 py-1 bg-[gray]/50 text-sm"
                          placeholder="Username"
                          type="text"
                          {...register("username")}
                        />
                        <ErrorMessage error={errors?.username?.message} />
                      </div>

                      <div className="flex flex-col gap-2">
                        <input
                          className="px-2 py-1 bg-[gray]/50 text-sm"
                          placeholder="Password"
                          type="password"
                          {...register("password")}
                        />
                        <ErrorMessage error={errors?.password?.message} />
                      </div>
                    </div>

                    <button className="btn-primary mt-4 w-full text-sm" disabled={isLoading} >
                     { isLoading ? 'Loading...' : 'Log in' }
                    </button>
                  </form>
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
                </div>
              </div>

              {/* -------Second Container-------- */}
              <div className="w-full h-[80px] border border-[#c7c7c7]  border-opacity-60 grid place-items-center">
                <div className="">
                  <div className="text-sm text-white space-x-2 flex">
                    <h3>Don't have an account?</h3>
                    <CustomNavigator
                      to={"/signup"}
                      className="cursor-pointer text-primary-500 font-bold "
                    >
                      Sign up
                    </CustomNavigator>
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
