import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import "../../styles/PasswordReset.css";

const { Title, Link } = Typography;

const PasswordReset: React.FC = () => {
  const onFinish = (values: { email: string }) => {
    console.log("Received values of form: ", values);
    // Handle password reset logic here
  };

  return (
    <div
      className="password-reset-page"
      style={{
        backgroundImage: "url(/image/background.png)",
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
          Request a Password Reset
        </Title>
        <Form name="password_reset" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email Address"
              type="email"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="button-reset"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        <div className="password-reset-link">
          <Link href="/sign-in">Go Back Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
