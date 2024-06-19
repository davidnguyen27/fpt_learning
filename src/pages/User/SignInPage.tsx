import { Divider } from "antd";
import { FormSignIn } from "../../components";

const SignInPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-300">
      <div className="w-1/2 rounded-lg bg-slate-200 p-8">
        <h2 className="mb-4 text-center text-2xl font-bold">Welcome Back</h2>
        <p className="mb-8 text-center text-sm font-light">
          Login To Your FPT Account!
        </p>
        <div className="my-4 flex cursor-pointer items-center justify-center">
          <div className="flex h-10 w-10 items-center rounded-full bg-blue-700">
            <i className="fa-brands fa-facebook-f m-auto"></i>
          </div>
          <span className="ml-3 hover:text-amber-500">
            Continue with Facebook
          </span>
        </div>
        <div className="my-4 flex cursor-pointer items-center justify-center">
          <div className="flex h-10 w-10 items-center rounded-full bg-amber-400">
            <i className="fa-brands fa-google m-auto"></i>
          </div>
          <span className="ml-3 hover:text-amber-500">
            Continue with Google
          </span>
        </div>
        <FormSignIn />
        <p className="text-center text-sm">
          Or{" "}
          <a href="#" className="text-amber-500 hover:underline">
            Forgot password
          </a>
          .
        </p>
        <Divider />
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a className="text-amber-500 hover:underline" href="/sign-up">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
