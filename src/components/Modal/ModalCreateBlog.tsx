import { Form, Input, Modal } from "antd";

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalCreateBlog = (props: ModalCreateProps) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal
      title="CREATE BLOG"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => setIsOpen(false)}
      width={700}
    >
      <Form className="mt-4">
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Title" />
        </Form.Item>
        <Form.Item name="description">
          <Input className="text-sm" size="large" placeholder="Description" />
        </Form.Item>
        <Form.Item>
          <Input className="text-sm" type="file" size="large" />
        </Form.Item>
        <Form.Item name="createdAt">
          <Input
            className="text-sm"
            type="date"
            size="large"
            placeholder="Created At"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateBlog;
