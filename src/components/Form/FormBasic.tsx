import { Form, Input, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";

const FormBasic = () => {
  return (
    <Form layout="vertical" className="mt-5">
      <Form.Item label="Lecture Title *">
        <Input placeholder="Title here" />
      </Form.Item>
      <Form.Item label="Description *">
        <TextArea rows={4} placeholder="Description here..." />
      </Form.Item>
      <h3>
        Free Preview <Switch />
      </h3>
    </Form>
  );
};

export default FormBasic;
