import { Form, Input, Radio } from "antd";

const FormSignUp = () => {
  return (
    <Form>
      <Form.Item
        name="fullName"
        rules={[{ required: true, message: "Required!" }]}
      >
        <Input className="text-sm" size="large" placeholder="Full Name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Required!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input className="text-sm" size="large" placeholder="Email address" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Required!" },
          { min: 10, message: "Password must be at least 10 characters!" },
        ]}
      >
        <Input
          className="text-sm"
          type="password"
          size="large"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Required!" },
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
        <Input
          className="text-sm"
          type="password"
          size="large"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Radio>
        I'm in for emails with exciting discounts and personalized
        recommendations
      </Radio>
      <br />
      <Form.Item>
        <button
          type="submit"
          className="my-4 w-full rounded-md bg-amber-500 px-4 py-2 hover:bg-stone-900 hover:text-white"
        >
          Sign Up
        </button>
      </Form.Item>
    </Form>
  );
};

export default FormSignUp;
