import { Form, Input, Modal } from "antd";
import useAddCategory from "../../hooks/category/useAddCategory";

interface ModalAddCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const ModalAddCategory = (props: ModalAddCategoryProps) => {
  const { open, setOpen, onSuccess } = props;
  const [form] = Form.useForm();
  const { createCategory, loading } = useAddCategory(onSuccess);
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.full_time = Number(values.full_time);
      values.position_order = Number(values.position_order);
      await createCategory(values);
      form.resetFields();
      setOpen(false);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <Modal
      title="Add Category"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleSubmit}
      confirmLoading={loading}
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
          onClick={handleSubmit}
        >
          {loading ? "Add" : "Add..."}
        </button>,
      ]}
    >
      <Form
        layout="horizontal"
        className="mt-4"
        form={form}
        labelCol={{ span: 5 }}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Category Name is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Lesson Name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input className="text-sm" size="large" placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCategory;
