import React from "react";
import { Layout, Form, Input, Button, Upload, message } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { AppFooter, AppHeader, AppSider } from "../../components";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import { useSider } from "../../app/context/SiderContext";

const FeedbackPage: React.FC = () => {
  const { collapsed } = useSider();
  const [form] = Form.useForm();

  const handleImageUpload = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Layout className="flex h-screen w-screen flex-col">
      <Header className="header">
        <AppHeader />
      </Header>
      <Layout className="flex flex-1">
        <Sider
          className="sider"
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
          width={220}
        >
          <AppSider
            className={`transition-all duration-75 ${
              collapsed ? "w-0" : "w-64"
            }`}
          />
        </Sider>

        <Layout className="flex flex-1 flex-col">
          <Content className="flex-1 overflow-auto">
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
            <Footer className="footer mt-auto" style={{ marginTop: "75px" }}>
              <AppFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FeedbackPage;
