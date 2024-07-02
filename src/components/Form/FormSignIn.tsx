import { Form, Input, Radio } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

// Define the expected structure of the decoded JWT payload
interface ExtendedJwtPayload {
  email: string;
  name: string;
  picture: string;
}

const FormSignIn = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login, setUser } = authContext;

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      const storedUser = sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user) {
        sessionStorage.setItem("userRole", user.role);
        switch (user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "instructor":
            navigate("/instructor/dashboard");
            break;
          case "student":
            navigate("/");
            break;
          default:
            console.log("Unknown role!");
            break;
        }
      } else {
        return alert("Email or password is wrong!");
      }
    } catch (error) {
      console.error("Unknown error: ", error);
    }
  };

  const onSuccess = (credentialResponse: any) => {
    if (credentialResponse?.credential) {
      const decoded = jwtDecode<ExtendedJwtPayload>(
        credentialResponse.credential,
      );
      sessionStorage.setItem("token", credentialResponse.credential);

      // Extract user information from decoded token
      const user: any = {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
        role: "student", // You might want to handle the role more dynamically
      };

      // Save user information in session storage
      sessionStorage.setItem("user", JSON.stringify(user));

      // Update context
      setUser(user);

      console.log("Google login successful. Decoded token: ", decoded);
      navigate("/");
    }
  };

  const onError = () => {
    console.log("Google login failed");
    alert("Failed to log in with Google.");
  };

  return (
    <div className="relative">
      <h2 className="mb-12 text-xl font-bold text-black">
        Welcome to FPT Education...
      </h2>
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
            href="/forgot-password"
            className="text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 transition duration-150 ease-in-out"
          >
            Forgot password?
          </a>
        </div>
        <br />
        <Form.Item>
          <button
            type="submit"
            className="mb-3 flex w-full items-center justify-center rounded border border-black bg-[#ef4444] px-7 py-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 hover:bg-[#333] hover:text-white"
          >
            Sign In
          </button>
          <p className="mb-0 text-sm font-semibold">
            Don't have an account?{" "}
            <a href="sign-up" className="text-red-500">
              Sign Up
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
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
        </div>
      </Form>
    </div>
  );
};

export default FormSignIn;
