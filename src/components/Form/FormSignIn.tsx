import { Form, Input, Radio } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../app/context/AuthContext";

const FormSignIn = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login } = authContext;

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      const storedUser = sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (user) {
        sessionStorage.setItem("userRole", user.role);
        switch (user.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;

          case "instructor":
            navigate("/instructor-dashboard");
            break;

          case "student":
            navigate("/");
            break;

          default:
            console.log("Unknown role!");
            break;
        }
      } else {
        return alert("Email or password is wrong!");
      }
    } catch (error) {
      console.error("Unknown error: ", error);
    }
  };

  return (
    <Form onFinish={handleLogin}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Email is required!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input
          className="text-sm"
          size="large"
          placeholder="Email address"
          prefix={<i className="fa-solid fa-envelope"></i>}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Password is required!" }]}
      >
        <Input
          className="text-sm"
          type="password"
          size="large"
          placeholder="Password"
          prefix={<i className="fa-solid fa-key"></i>}
        />
      </Form.Item>
      <Radio>Remember me</Radio>
      <br />
      <Form.Item>
        <button
          type="submit"
          className="my-4 w-full rounded-md bg-amber-500 px-4 py-2 hover:bg-stone-900 hover:text-white"
        >
          Sign In
        </button>
      </Form.Item>
    </Form>
  );
};

export default FormSignIn;
