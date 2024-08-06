import React, { useEffect, useState } from "react";
import { Button, Typography, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import "../../styles/PasswordReset.css";
import forgotPassword from "../../assets/Image/background.png";
import { resendEmailAPI, verifyEmailAPI } from "../../services/authService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const VerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useParams<{ token: string }>();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [counter, setCounter] = useState(60);

  const email = location.state?.email;

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const res = await verifyEmailAPI(token);
          if (res) {
            notification.success({
              message: "Email Verified Successfully",
              description: "You can now log in to the system.",
            });
            navigate("/sign-in");
          }
        } catch (error) {
          notification.error({
            message: "Verification Failed",
            description: "Your token is expired or incorrect!",
          });
        }
      };

      verifyToken();
    }
  }, [token, navigate]);


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
      <div className="password-reset-container w-full">
        <Title level={2} className="password-reset-title">
          Verify Email
        </Title>
        <div className="password-reset-link">
          <Button
            type="primary"
            size="large"
            onClick={handleResendToken}
            disabled={isButtonDisabled}
            icon={<MailOutlined />}
            style={{ width: "100%" }}
          >
            {isButtonDisabled ? `Resend in ${counter}s` : "Resend"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
