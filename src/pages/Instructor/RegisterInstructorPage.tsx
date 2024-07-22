import React, { useState } from "react";
import { Form, Input, Button, notification, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import signUp from "../../assets/Image/background.png";
import { registerUser } from "../../services/usersService";
import TextArea from "antd/es/input/TextArea";
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { registerViaGoogleAPI } from "../../services/authService";

interface RegisterFormValues {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
  description: string;
  video: string;
  avatar: File | null;
}

const RegisterInstructorPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [googleUser, setGoogleUser] = useState<{ credential: string } | null>(
    null,
  );
  const [description, setDescription] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const onFinish = async (values: Omit<RegisterFormValues, "avatar">) => {
    try {
      setLoading(true);
      let avatarUrl = "";

      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${avatarFile.name}`);
        await uploadBytes(storageRef, avatarFile);
        avatarUrl = await getDownloadURL(storageRef);
      }

      const userData = {
        ...values,
        role: "instructor",
        avatar: avatarUrl,
      };

      await registerUser(userData);
      notification.success({
        message: "Registration Successful",
        description: "Please wait for the Administrator to accept!",
      });
      form.resetFields();
      setAvatarFile(null);
    } catch (error: any) {
      notification.error({
        message: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (credential) {
      setGoogleUser({ credential });
      setIsModalVisible(true);
    }
  };

  const onError = () => {
    alert("Unable to login with Google.");
  };

  const handleModalOk = async () => {
    if (googleUser && description && video) {
      try {
        const user = await registerViaGoogleAPI(
          googleUser.credential,
          "instructor",
          description,
          video,
          phone,
        );
        if (user) {
          notification.success({
            message: "Google Login Successful",
            description:
              "You have registered successfully via Google. Please complete your profile information.",
          });
        } else {
          notification.error({
            message: "Google Registration Failed",
            description: "Failed to complete the registration process.",
          });
        }
        setIsModalVisible(false);
        setDescription("");
        setVideo("");
        setPhone("");
      } catch (error) {
        notification.error({
          message: "Google Registration Failed",
          description: "Failed to complete the registration process.",
        });
      }
    } else {
      notification.warning({
        message: "Incomplete Information",
        description:
          "Please provide a description and video URL to complete registration.",
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center"
      style={{
        backgroundImage: `url(${signUp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-xl font-bold">
          Register with Instructor
        </h2>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="horizontal"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
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
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "You must confirm the password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Confirm Password does not match!"),
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
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required!" }]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="video"
            label="Video URL"
            rules={[{ required: true, message: "Video URL is required!" }]}
          >
            <Input placeholder="https://example.com/video" />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Avatar"
            rules={[{ required: true, message: "Avatar is required!" }]}
          >
            <Input type="file" onChange={handleFileChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className="w-full bg-[#ef4444] text-white hover:bg-[#333] hover:text-white"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="mb-4 w-full text-center">
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
        </div>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="text-red-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
      <Modal
        title="Complete Registration"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Description"
            required
            validateStatus={description ? "success" : "error"}
            help={!description && "Please enter a description"}
          >
            <Input.TextArea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item
            label="Video URL"
            required
            validateStatus={video ? "success" : "error"}
            help={!video && "Please enter a video URL"}
          >
            <Input
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="https://example.com/video"
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            required
            validateStatus={phone ? "success" : "error"}
            help={!phone && "Please enter a phone number"}
          >
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+84...."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterInstructorPage;
