import { Form, InputNumber } from "antd";

const TabFormPaid = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Regular Price *">
        <InputNumber addonAfter="$" placeholder="$0" className="w-1/3" />
      </Form.Item>
      <Form.Item label="Discount Price *">
        <InputNumber addonAfter="$" placeholder="$0" className="w-1/3" />
      </Form.Item>
    </Form>
  );
};

export default TabFormPaid;
