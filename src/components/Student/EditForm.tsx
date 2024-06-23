import React from "react";
import { Form, Input, Button } from "antd";

interface EditFormProps {
  field: string;
  initialValue: string | boolean;
  onCancel: () => void;
  onSubmit: (updatedField: any) => void;
}

const EditForm: React.FC<EditFormProps> = ({
  field,
  initialValue,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
    onSubmit(values[field.toLowerCase().replace(/ /g, "_")]);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={{ [field.toLowerCase().replace(/ /g, "_")]: initialValue }}
    >
      <Form.Item
        label={field}
        name={field.toLowerCase().replace(/ /g, "_")}
        rules={[{ required: true, message: `Please input your ${field}!` }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onCancel} className="ml-2">
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
