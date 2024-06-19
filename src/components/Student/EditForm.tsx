import React from 'react';
import { Form, Input, Button } from 'antd';

interface EditFormProps {
  field: string;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ field, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log('Form values:', values);
    onCancel();
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item
        label={field}
        name={field.toLowerCase().replace(/ /g, '_')}
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
