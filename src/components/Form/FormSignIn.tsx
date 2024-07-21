import { Form, Input, notification, Radio } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/context/AuthContext";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { getCurrentLogin, loginViaGoogleAPI } from "../../services/authService";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";


const FormSignIn = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

  const { user, login } = authContext;

  useEffect(() => {
    if (user?.data) {
      switch (user.data.role) {
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
    }
  }, [user, navigate]);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in!",
      });
    } catch (error) {
      console.error("Unknown error: ", error);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const { credential } = credentialResponse;
      console.log(credential);
      if (!credential) {
        throw new Error("Google credential is missing");
      }

      const token = await loginViaGoogleAPI(credential);
      if (token) {
        const user = await getCurrentLogin(token);
        if (user?.data) {
          sessionStorage.setItem("user", JSON.stringify(user));
          notification.success({
            message: "Login Successful",
          });
          navigate("/");
        }
      }
    } catch (error: any) {
      notification.error({
        message: "Login via Google Failed!",
        description: error.message || "Your Google Account isn't registered!",
      });
    }
  };

  const onError = () => {
    console.log("Google login failed");
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
          <Input.Password
            className="text-sm"
            type="password"
            size="large"
            placeholder="Password"
            prefix={<i className="fa-solid fa-key"></i>}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
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
          <button
            type="submit"
            className="mb-3 flex w-full items-center justify-center rounded border border-black bg-[#ef4444] px-7 py-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 hover:bg-[#333] hover:text-white"
          >
            <a href="/admin-login">
              SIGN IN WITH ADMIN
            </a>
          </button>
          <p className="mb-0 text-sm font-semibold">
            Don't have an account?{" "}
            <a href="sign-up" className="text-red-500">
              Sign Up
            </a>
          </p>
        </Form.Item>
        <div className="sau:border-neutral-300 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
            OR
          </p>
        </div>
      </Form>
      <div className="w-full">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={onError} />
      </div>
    </div>
  );
};

export default FormSignIn;
