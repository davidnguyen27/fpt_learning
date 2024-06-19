import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, Form, Input, Upload, message } from "antd";

const SettingAccount = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    message.success("Profile updated successfully");
  };

  const handleAvatarChange = (info: any) => {
    if (info.file.status === "done") {
      setAvatar(info.file.response.url);
    }
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: "500px" }}
      >
        <h2 className="section-heading">Account settings</h2>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Profile Picture">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/upload"
            onChange={handleAvatarChange}
          >
            {avatar ? (
              <img src={avatar} alt="Avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="Profile Links" name="profileLinks">
          <Input placeholder="Website, LinkedIn, etc." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SettingAccount;
