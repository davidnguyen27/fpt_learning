import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { Category } from "../../models/Category/index";

interface ModalEditCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentCategory: Partial<Category["pageData"][number]> | null;
  onSubmit: (values: Partial<Category["pageData"][number]>) => void;
}

const ModalEditCategory = (props: ModalEditCategoryProps) => {
  const { open, setOpen, currentCategory, onSubmit } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentCategory) {
      form.setFieldsValue(currentCategory);
    }
  }, [currentCategory, form]);

  const handleSubmit = (values: Partial<Category["pageData"][number]>) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <Modal
      title="EDIT CATEGORY"
      open={open}
      onCancel={() => setOpen(false)} // Sử dụng onCancel để đóng modal
      width={700}
      footer={[
        <button
          key="cancel"
          className="mr-3 rounded-md bg-zinc-300 px-4 py-1"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>,
        <button
          key="submit"
          type="submit"
          className="rounded-md bg-red-500 px-4 py-1"
          onClick={() => form.submit()}
        >
          Edit
        </button>,
      ]}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="mt-4"
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Category Name is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Category Name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input className="text-sm" size="large" placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditCategory;
