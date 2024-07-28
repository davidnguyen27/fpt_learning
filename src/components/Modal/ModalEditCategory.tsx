import { Button, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { getCategoryAPI } from "../../services/categoryService";
import useEditCategory from "../../hooks/category/useEditCategory";

interface ModalEditCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  categoryId: string | null;
  onSuccess: () => void;
}

const ModalEditCategory = (props: ModalEditCategoryProps) => {
  const { open, setOpen, categoryId, onSuccess } = props;
  const [form] = Form.useForm();
  const { editCategory, loading } = useEditCategory(onSuccess);
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    if (categoryId) {
      getCategoryAPI(categoryId)
        .then((data) => {
          console.log(data);
          if (data) {
            const categoryData = {
              name: data.name,
              id: data._id,
              description: data.description,
            };
            setInitialValues(categoryData);
            form.setFieldsValue(categoryData);
          } else {
            message.error("No category found with the given ID");
          }
        })
        .catch((error) => {
          console.log(error);
          message.error("Failed to fetch category data");
        });
    } else {
      form.resetFields();
      setInitialValues({});
    }
  }, [categoryId, form]);

  useEffect(() => {
    if (open && categoryId) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, open, form, categoryId]);

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      if (categoryId) {
        await editCategory(categoryId, values);
        form.resetFields();
        setOpen(false);
      }
    } catch (error) {
      message.error("Failed to update category");
    }
  };

  return (
    <Modal
      title="Edit category"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleEdit}
      confirmLoading={loading}
      width={700}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          loading={loading}
          onClick={handleEdit}
        >
          Edit
        </Button>,
      ]}
    >
      <Form
        layout="horizontal"
        className="mt-4"
        form={form}
        labelCol={{ span: 5 }}
        labelAlign="left"
        initialValues={initialValues}
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
