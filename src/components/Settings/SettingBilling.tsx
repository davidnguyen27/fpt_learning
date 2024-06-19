import { Button, Form, Input, Select, message } from "antd";
const { Option } = Select;

const SettingBilling = () => {
  const onFinish = (values: any) => {
    console.log("Received values:", values);
    message.success("Profile updated successfully");
  };
  return (
    <div>
      {" "}
      <h2 className="text-xl font-bold" style={{ marginBottom: "16px" }}>
        Billing and Payments
      </h2>
      <p>
        Want to charge for a course? Provide your payment info and opt in for
        our promotional programs
      </p>
      <h2
        className="text-xl font-bold"
        style={{ marginBottom: "16px", marginTop: "15px" }}
      >
        Billing Address
      </h2>
      <Form
        name="billingSettingsForm"
        onFinish={onFinish}
        style={{ maxWidth: "400px" }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Withdrawal Method"
          name="withdrawalMethod"
          rules={[
            {
              required: true,
              message: "Please select withdrawal method!",
            },
          ]}
        >
          <Select>
            <Option value="paypal">PayPal</Option>
            <Option value="bank">Bank Transfer</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SettingBilling;
