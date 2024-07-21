import { Button, Form, Input, notification } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import { createAccount } from "../../app/redux/user/userSlice";
import { User } from "../../models/Types";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { registerViaGoogleAPI } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FormSignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: Partial<User["data"]>) => {
    const { name, email, password } = values;
    const userData: Partial<User["data"]> = {
      name,
      email,
      password,
      avatar:
        "https://icons.veryicon.com/png/o/miscellaneous/icon-icon-of-ai-intelligent-dispensing/login-user-name-1.png",
    };
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (credential) {
        const user: User["data"] = await registerViaGoogleAPI(
          credential,
          "student",
          "",
          "",
          "",
        );
        console.log(user);
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
    console.log("Đăng nhập Google thất bại");
    alert("Không thể đăng nhập bằng Google.");
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Full Name" />
        </Form.Item>
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
        <br />
        <Form.Item>
          <Button
            loading={loading}
            htmlType="submit"
            type="primary"
            className="w-full bg-red-500 py-4"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <div className="mb-4 w-full">
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </div>
    </>
  );
};

export default FormSignUp;
