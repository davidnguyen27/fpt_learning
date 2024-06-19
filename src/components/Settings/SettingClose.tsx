import { Button, Form, Input, message } from "antd";

const SettingClose = () => {
  const onConfirmPassword = (values: any) => {
    const { password } = values;
    if (password === "correct_password") {
      message.success("Your account has been successfully deleted.");
    } else {
      message.error("Incorrect password. Please try again.");
    }
  };
  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <h2 className="text-xl font-bold" style={{ marginBottom: "16px" }}>
          Close Account
        </h2>
        <p className="font-bold">Warning:</p>
        <div style={{ marginLeft: "20px" }}>
          <p>
            {" "}
            This action is irreversible. All your data will be permanently
            deleted.
          </p>
          <p>Please confirm your password to proceed:</p>
        </div>
      </div>
      <Form
        name="confirmPassword"
        onFinish={onConfirmPassword}
        style={{ maxWidth: "300px" }}
      >
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password to confirm.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginBottom: "200px" }}
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SettingClose;
