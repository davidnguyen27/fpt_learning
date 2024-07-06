import { Form, Input, List } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import { createAccount } from "../../app/redux/user/userSlice";
import { User } from "../../models/Types";

const FormSignUp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: Partial<User["data"]>) => {
    const { name, email, password } = values;
    const userData: Partial<User["data"]> = {
      name,
      email,
      password,
    };
    dispatch(createAccount(userData));
  };

  return (
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
      <Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <List
              size="small"
              dataSource={[
                "Use 6 or more characters",
                "Use an upper and lower case letter (e.g. Aa)",
              ]}
              renderItem={(item) => (
                <List.Item>
                  <MinusCircleOutlined style={{ marginRight: 8 }} />
                  {item}
                </List.Item>
              )}
            />
          </div>
          <div style={{ flex: "1", marginLeft: "10px" }}>
            <List
              size="small"
              dataSource={[
                "Use a number (e.g. 1234)",
                "Use a symbol (e.g. !@#$%)",
              ]}
              renderItem={(item) => (
                <List.Item>
                  <MinusCircleOutlined style={{ marginRight: 8 }} />
                  {item}
                </List.Item>
              )}
            />
          </div>
        </div>
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
        <button
          type="submit"
          className="mb-3 flex w-full items-center justify-center rounded border border-black bg-[#ef4444] px-7 py-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 hover:bg-[#333] hover:text-white"
        >
          Sign Up
        </button>
      </Form.Item>
    </Form>
  );
};

export default FormSignUp;
