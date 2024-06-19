import { Button, Flex, Form, Input, Select } from "antd";

const ReportForm = () => {
  const [form] = Form.useForm();
  return (
    <Form
      className=""
      form={form}
      scrollToFirstError
      style={{ paddingBlock: 32, marginInlineStart: "20px" }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item wrapperCol={{ offset: 6 }}>
        <div className="text-xl font-bold">Submit Report</div>
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Email is required!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Title" name="title">
        <Select
          options={[
            { label: "Không xem được bài giảng", value: "user" },
            { label: "Mua khóa học nhưng chưa thấy", value: "instructor" },
            { label: "Không xem được phụ đề", value: "instructor" },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Required!" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item name="file" label="Image">
        <Input type="file" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Flex gap="small">
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default ReportForm;
