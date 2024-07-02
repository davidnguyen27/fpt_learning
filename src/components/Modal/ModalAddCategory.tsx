import { Form, Input, Modal } from "antd";

interface ModalAddCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalAddCategory = (props: ModalAddCategoryProps) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="ADD CATEGORY"
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
        <button
          type="submit"
          className="rounded-md bg-red-500 px-4 py-1"
          onClick={() => setOpen(false)}
        >
          Add
        </button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item
          name="course_id"
          label="Course ID"
          rules={[{ required: true, message: "Email is require!" }]}
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

export default ModalAddCategory;
