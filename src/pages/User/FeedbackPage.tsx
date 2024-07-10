import React from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import MainLayout from "../../components/Layout/MainLayout";

const FeedbackPage: React.FC = () => {
  const [form] = Form.useForm();

  const handleImageUpload = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <MainLayout>
      <Form
        form={form}
        scrollToFirstError
        style={{ paddingBlock: 32 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item wrapperCol={{ offset: 6 }}>
          <div className="text-xl font-bold">Send Feedback</div>
        </Form.Item>

        <Form.Item
          name="username"
          label="UserName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <div className="font-bold">Add Screenshots</div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Upload
            name="image"
            action="/upload/image"
            onChange={handleImageUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Send Feedback
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export default FeedbackPage;
