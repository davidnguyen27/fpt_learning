import { Form, Input, Modal } from "antd";

interface ModalEditCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalEditCategory = (props: ModalEditCategoryProps) => {
  const { open, setOpen } = props;

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="EDIT CATEGORY"
      open={open}
      onClose={() => setOpen(false)}
      width={700}
      footer={[
        <button
          className="mr-3 rounded-md bg-zinc-300 px-4 py-1"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>,
        <button type="submit" className="rounded-md bg-red-500 px-4 py-1">
          Edit
        </button>,
      ]}
    >
      <Form onFinish={handleSubmit} layout="vertical" className="mt-4">
        <Form.Item
          name="course_id"
          label="Course ID"
          rules={[{ required: true, message: "Course ID is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Course ID" />
        </Form.Item>
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[{ required: true, message: "Category Name is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Category Name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditCategory;
