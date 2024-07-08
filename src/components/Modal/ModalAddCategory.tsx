import { Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { createCategory } from "../../app/redux/categories/categorySlice";

interface ModalAddCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalAddCategory = (props: ModalAddCategoryProps) => {
  const { open, setOpen } = props;
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.category);

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields();

      const categoryData = {
        name: values.name,
        description: values.description || "",
        parent_category_id: values.parent_category_id || null,
      };

      await dispatch(createCategory(categoryData)).unwrap();
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <Modal
      title="ADD CATEGORY"
      open={open}
      onClose={() => setOpen(false)}
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
          onClick={handleAddCategory}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>,
      ]}
    >
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form layout="vertical" className="mt-4" form={form}>
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

export default ModalAddCategory;
