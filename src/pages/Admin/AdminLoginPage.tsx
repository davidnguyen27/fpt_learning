import React from "react";
import { Form, Input, notification } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/redux/store"; 
import { createAccount } from "../../app/redux/user/userSlice"; 
import { User } from "../../models/Types"; 
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
//import { registerViaGoogleAPI } from "../../services/authService"; 
import { useNavigate } from "react-router-dom";

const AdminLoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (values: Partial<User["data"]>) => {
    const { name, email, password } = values;
    const userData: Partial<User["data"]> = { name, email, password };
    try {
      await dispatch(createAccount(userData)).unwrap();
      notification.success({
        message: "Registration Successful",
        description: "Please verify your email in 24 hours.",
      });
      navigate("/verify-account", { state: { email } });
    } catch (error: any) {
      notification.error({
        message: "Registration Failed",
        description: error,
      });
    }
  };

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (credential) {
        notification.success({
          message: "Registration Successful",
          description: "You have registered successfully via Google!",
        });
        navigate("/verify-account");
      } else {
        throw new Error("Google credential response is missing.");
      }
    } catch (error) {
      notification.error({
        message: "Google Registration Failed",
        description: "Your email has already exist!",
      });
    }
  };

  const onError = () => {
    console.log("Google login failed");
    alert("Cannot login with Google.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/3712.jpg')`,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email address!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input className="text-sm" size="large" placeholder="Email address" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter the password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
              { max: 31, message: "Maximum length is 31 characters!" },
              {
                pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one digit, and one special character.",
              },
            ]}
          >
            <Input.Password
              className="text-sm"
              size="large"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "You must confirm the password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Confirm Password do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              className="text-sm"
              size="large"
              placeholder="Confirm Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded"
            >
              Sign in
            </button>
          </Form.Item>
        </Form>
        <div className="mt-4">
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
