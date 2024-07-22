import { Button, Form, Input, notification } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { User } from "../../models/Types";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { registerViaGoogleAPI } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/usersService";

const FormSignUp = () => {
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
      const user = await registerUser(userData);
      notification.success({
        message: "Registration Successful",
        description: "Please verify your email in 24 hours.",
      });
      navigate("/verify-account", { state: { email: user?.data.email } });
    } catch (error: any) {
      notification.error({
        message: "Registration Failed",
        description: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (credential) {
        await registerViaGoogleAPI(credential, "student", "", "", "");
        notification.success({
          message: "Registration Successful",
          description: "You have registered successfully via Google!",
        });
        navigate("/verify-account");
      } else {
        throw new Error("Google credential response is missing.");
      }
    } catch (error: any) {
      notification.error({
        message: "Google Registration Failed",
        description: error.message,
      });
    }
  };

  const onError = () => {
    alert("Cannot login with Google.");
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
