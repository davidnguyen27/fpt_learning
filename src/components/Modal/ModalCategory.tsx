import { Form, Input, Modal } from "antd";
import { Category } from "../../models/Types";
import { useEffect } from "react";

interface ModalCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: Category["pageData"][number] | null;
}

const ModalCategory = (props: ModalCategoryProps) => {
  const { open, setOpen, category } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        _id: category._id,
        name: category.name,
        description: category.description,
        created_at: category.created_at,
        updated_at: category.updated_at,
      });
    }
  }, [category, form]);

  return (
    <Modal
      title="CATEGORY DETAIL"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      width={700}
    >
      <Form layout="vertical" className="mt-4" form={form}>
        <Form.Item label="Category ID" name="_id">
          <Input className="text-sm" size="large" disabled />
        </Form.Item>
        <Form.Item label="Category Name" name="name">
          <Input className="text-sm" size="large" disabled />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input className="text-sm" size="large" disabled />
        </Form.Item>
        <Form.Item label="Created At" name="created_at">
          <Input className="text-sm" size="large" disabled />
        </Form.Item>
        <Form.Item label="updated At" name="updated_at">
          <Input className="text-sm" size="large" disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCategory;
