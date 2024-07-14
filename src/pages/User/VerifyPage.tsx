import React, { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import "../../styles/PasswordReset.css";
import forgotPassword from "../../assets/Image/background.png";
import { resendEmailAPI, verifyEmailAPI } from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

const VerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [counter, setCounter] = useState(60);

  const email = location.state?.email;

  const onFinish = async (values: { token: string }) => {
    try {
      const res = await verifyEmailAPI(values.token);
      if (res) {
        notification.success({
          message: "Successful for verify email",
          description: "You can login the system",
        });
        navigate("/sign-in");
      }
    } catch (error) {
      notification.error({
        message: "Failed!",
        description: "Your token is expired or wrong!",
      });
    }
  };

  const handleResendToken = async () => {
    try {
      const res = await resendEmailAPI(email);
      if (res) {
        notification.success({
          message: "Token Resent",
          description: "A new token has been sent to your email.",
        });
      }
      setIsButtonDisabled(true);
      setCounter(60);
      const countdown = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 1) {
            clearInterval(countdown);
            setIsButtonDisabled(false);
            return 60;
          }
          return prevCounter - 1;
        });
      }, 1000);
    } catch (error: any) {
      notification.error({
        message: "Failed!",
        description: error.message,
      });
    }
  };

  return (
    <div
      className="password-reset-page"
      style={{
        backgroundImage: `url(${forgotPassword})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="password-reset-container">
        <Title level={2} className="password-reset-title">
          Verify Email
        </Title>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="token"
            label="Token"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter token..."
              type="text"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="button-reset"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="password-reset-link">
          <Button
            type="link"
            onClick={handleResendToken}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? `Resend in ${counter}s` : "Resend"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;