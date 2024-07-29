import { Button, Form, Input, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import useAddBlog from "../../hooks/blog/useAddBlog";
import { Category, DataTransfer } from "../../models/Category";
import { getCategoriesAPI } from "../../services/categoryService";
import Tiny from "../../app/Editor/RichTextEditor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/firebase";

const { Option } = Select;

interface ModalAddBlogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const ModalAddBlog: React.FC<ModalAddBlogProps> = ({
  open,
  setOpen,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { createBlog, loading } = useAddBlog(onSuccess);

  useEffect(() => {
    if (open) {
      const fetchCategories = async () => {
        try {
          const dataTransfer: DataTransfer = {
            searchCondition: {
              keyword: "",
              is_delete: false,
              is_parent: true,
            },
            pageInfo: {
              pageNum: 1,
              pageSize: 10,
            },
          };
          const categoriesData = await getCategoriesAPI(dataTransfer);
          setCategories(categoriesData);
        } catch (error: any) {
          message.error(error.message);
        } finally {
          setCategoriesLoading(false);
        }
      };

      fetchCategories();
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      let imageUrl = "";
      if (imageFile) {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const blogData = {
        ...values,
        image_url: imageUrl,
      };

      await createBlog(blogData);
      form.resetFields();
      setOpen(false);
      setImageFile(null);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Create Blog"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={700}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="horizontal" labelCol={{ span: 4 }}>
        <Form.Item
          label="Title"
          name="name"
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true, message: "Category is required!" }]}
        >
          <Select placeholder="Select a category" loading={categoriesLoading}>
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image_url"
          rules={[{ required: true, message: "Image is required!" }]}
        >
          <Input type="file" onChange={handleFileChange} />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Content is required!" }]}
        >
          <Tiny
            value={form.getFieldValue("content") || ""}
            onChange={(value: any) => form.setFieldsValue({ content: value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddBlog;
