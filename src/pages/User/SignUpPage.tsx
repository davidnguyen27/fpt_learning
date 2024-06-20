import { Divider } from "antd";
import FormSignUp from "../../components/Form/FormSignUp";

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-300"
    style={{ 
      backgroundImage: "url(/public/image/background.png)", 
      backgroundSize: "cover", 
      backgroundPosition: "center"
    }}
    >
      <div className="max-h-dvh max-w-sl rounded-lg bg-white p-4">
        <h2 className="mb-5 text-center text-2xl font-bold">
          Welcome to FPT Education
        </h2>
        <p className="mb-8 text-center text-base font-light">
          Create an account
        </p>
        <FormSignUp />
        <p className="text-center text-sm">
          By signing up, you agree to our{" "}
          <a className="text-black underline hover:text-amber-500" href="#">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="text-black underline hover:text-amber-500" href="#">
            Privacy Policy
          </a>
          .
        </p>
        <Divider />
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="text-red-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
