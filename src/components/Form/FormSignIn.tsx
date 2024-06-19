import { Form, Input, Radio } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/context/AuthContext";

const FormSignIn: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login } = authContext;

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      const storedUser = sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user) {
        sessionStorage.setItem("userRole", user.role);
        switch (user.role) {
          case "admin":
            navigate("/admin-page");
            break;

          case "instructor":
            navigate("/instructor-page");
            break;

          case "user":
            navigate("/");
            break;

          default:
            console.log("Unknown role!");
            break;
        }
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Unknown error: ", error);
    }
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-bold text-black mb-12">Welcome to FPT Education...</h2>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            className="text-sm"
            size="large"
            placeholder="Email address"
            prefix={<i className="fa-solid fa-envelope"></i>}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required!" }]}
        >
          <Input
            className="text-sm"
            type="password"
            size="large"
            placeholder="Password"
            prefix={<i className="fa-solid fa-key"></i>}
          />
        </Form.Item>
        <div className="flex items-center justify-between">
          <Radio>Remember me</Radio>
          <a
            href="#!"
            className="text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 transition duration-150 ease-in-out"
          >
            Forgot password?
          </a>
        </div>
        <br />
        <Form.Item>
          <button
            type="submit"
            className="mb-3 flex w-full items-center justify-center rounded border border-black bg-[#d97706] px-7 py-3 text-center text-sm font-medium uppercase leading-normal text-black hover:text-white shadow-md transition duration-150 hover:bg-[#333]"
          >
            Sign In
          </button>
          <p className="mb-0 text-sm font-semibold">
            Don't have an account?{" "}
            <a
              href="sign-up"
              className="text-red-500"
            >
              Register
            </a>
          </p>
        </Form.Item>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
            OR
          </p>
        </div>

        {/* <!-- Social login buttons --> */}
        <div className="w-full">
          <a
            className="mb-3 flex w-full items-center justify-center rounded border border-black bg-[#FFFFFF] px-7 py-3 text-center text-sm font-medium uppercase leading-normal text-black hover:text-black shadow-md transition duration-150"
            href="#!"
            role="button"
          >
            {/* <!-- Google --> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.8 0 6.8 1.5 8.9 3.9l6.6-6.6C35.3 3.1 30 1 24 1 14.6 1 6.6 6.7 3.1 14.4l7.6 5.9C12.5 15 17.7 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.2 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.7-2 5.1-4.3 6.6l7 5.5C43.4 36.6 46.2 31 46.2 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.7 28.7c-1-2.7-1.5-5.6-1.5-8.7s.5-6 1.5-8.7l-7.6-5.9C1.3 10.6 0 17.1 0 24s1.3 13.4 3.6 19.6l7.1-5.5z"
              />
              <path
                fill="#EA4335"
                d="M24 48c6.5 0 12-2.1 16.1-5.6l-7-5.5c-2.2 1.5-4.9 2.4-7.9 2.4-6.3 0-11.5-4.3-13.4-10.2l-7.1 5.5C6.6 43.3 14.8 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Continue with Google
          </a>
        </div>
      </Form>
    </div>
  );
};

export default FormSignIn;
