import { Form, Input, Button, Typography, message, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../styles/PasswordReset.css";
import forgotPassword from "../assets/Image/background.png";
import { changePasswordAPI } from "../services/usersService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../app/context/AuthContext";

const { Title } = Typography;

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("user");
    if (storagedUser) {
      const user = JSON.parse(storagedUser);
      if (user && user.data && user.data._id) {
        setUserId(user.data._id);
      }
    }
  }, []);

  const onFinish = async (values: any) => {
    const { old_password, new_password } = values;
    if (!userId) {
      return;
    }
    try {
      setLoading(true);
      await changePasswordAPI(userId, old_password, new_password);
      notification.success({
        message: "Password is changed successfully",
        description: "Please re-sign in to the system.",
      });
      logout();
      navigate("/sign-in");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
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
          Change Password
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="old_password"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input.Password
              className="text-sm"
              size="large"
              placeholder="Old password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="new_password"
            rules={[
              { required: true, message: "Please enter the password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              className="text-sm"
              size="large"
              placeholder="New password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="button-reset"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
