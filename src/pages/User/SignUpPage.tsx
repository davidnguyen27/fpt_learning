import { Divider } from "antd";
import FormSignUp from "../../components/Form/FormSignUp";

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-300">
      <div className="max-h-dvh max-w-xl rounded-lg bg-slate-200 p-8">
        <h2 className="mb-5 text-center text-2xl font-bold">
          Welcome to FPT Education
        </h2>
        <p className="mb-8 text-center text-base font-light">
          Sign Up and Start Learning!
        </p>
        <FormSignUp />
        <p className="text-center text-sm">
          By signing up, you agree to our{" "}
          <a className="text-amber-500 hover:underline" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="text-amber-500 hover:underline" href="#">
            Privacy Policy
          </a>
          .
        </p>
        <Divider />
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="text-amber-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
