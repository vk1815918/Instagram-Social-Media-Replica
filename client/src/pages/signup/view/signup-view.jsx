import { FaFacebook } from "react-icons/fa";
import { useSignupMutation } from "@/api/services/authServices.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "@/components/common/error-message";
import { CustomNavigator } from "@/handler/navigator";
import { toast } from "react-toastify";
const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{1,30}$/;

export const SignupValidationSchema = yup.object({
  username: yup
    .string()
    .matches(usernameRegex, `Invalid username please enter valid username `)
    .required("Username is required")
    .min(3, "length  must be 3 characters or more"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please write valid email"),
  fullName: yup
    .string()
    .required("Fullname is required")
    .min(3, "length must be at least 3 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "length must be 6 characters or more"),
});

const SignupView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      password: "",
    },
    resolver: yupResolver(SignupValidationSchema),
  });
  const [requestSignup, { isLoading }] = useSignupMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await requestSignup(data).unwrap();
      navigate("/login");
      toast(res.message || "Something went wrong please try again later", {
        className: "dark:bg-black dark:text-white",
      });
    } catch (error) {
      toast(error.message || "Something went wrong please try again later", {
        className: "dark:bg-black dark:text-white",
      });
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
                        placeholder="Fullname"
                        type="text"
                        {...register("fullName")}
                      />
                      <ErrorMessage error={errors?.fullName?.message} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        className="px-2 py-1 bg-[gray]/50 text-sm"
                        placeholder="Email"
                        type="text"
                        {...register("email")}
                      />
                      <ErrorMessage error={errors?.email?.message} />
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

                  <button
                    className="btn-primary mt-2 w-full text-sm"
                    disabled={isLoading}
                  >
                    Sign up
                  </button>
                </form>
              </div>
              {/* -------Second Container-------- */}
              <div className="mt-4 w-full border border-[#c7c7c7]  border-opacity-60 grid place-items-center">
                <div className="">
                  <div className="text-sm text-white space-x-2 flex">
                    <h3>I have an account</h3>
                    <CustomNavigator
                      to={"/login"}
                      className="cursor-pointer text-primary-500 font-bold "
                    >
                      Login
                    </CustomNavigator>
                  </div>
                </div>
              </div>{" "}
            </div>
            {/* -------Third Container-------- */}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
