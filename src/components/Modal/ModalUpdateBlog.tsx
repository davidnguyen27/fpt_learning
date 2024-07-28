import { Button, Form, Input, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import Tiny from "../../app/Editor/RichTextEditor";
import { getBlogAPI } from "../../services/blogService";
import { Blog } from "../../models/Blog";
import useUpdateBlog from "../../hooks/blog/useUpdateBlog";
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getCategoriesAPI } from "../../services/categoryService";
import { Category, DataTransfer } from "../../models/Category";
import { UserData } from "../../models/Types";

const { Option } = Select;

interface ModalUpdateBlogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  blogId: string | null;
  onSuccess: () => void;
  currentUser: UserData | undefined;
}

const ModalUpdateBlog: React.FC<ModalUpdateBlogProps> = ({
  open,
  setOpen,
  blogId,
  onSuccess,
  currentUser,
}) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<Partial<Blog>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { updateBlog, loading } = useUpdateBlog(onSuccess);

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

  useEffect(() => {
    if (blogId) {
      getBlogAPI(blogId)
        .then((data) => {
          if (data) {
            setImageUrl(data.image_url || "");
            setInitialValues(data);
            form.setFieldsValue(data);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch blog data:", error);
          message.error(error.message);
        });
    } else {
      form.resetFields();
      setInitialValues({});
      setImageUrl(null);
    }
  }, [blogId, form]);

  useEffect(() => {
    if (open && blogId) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, open, form, blogId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      let newImageUrl = imageUrl;
      if (imageFile) {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        newImageUrl = await getDownloadURL(storageRef);
      }

      if (blogId) {
        await updateBlog(blogId, {
          ...values,
          image_url: newImageUrl,
          user_id: currentUser?._id,
        });
        message.success("Blog updated successfully");
        onSuccess();
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Update Blog"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleUpdate}
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
          onClick={handleUpdate}
        >
          Update
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
          label="User Name"
          name="user_name"
          rules={[{ required: true, message: "User name is required!" }]}
        >
          <Input value={currentUser?.name} disabled />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item label="Image">
          <Input type="file" onChange={handleFileChange} />
        </Form.Item>
        {imageUrl && (
          <div>
            <p>Current Image:</p>
            <img
              src={imageUrl}
              alt="Current Blog"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
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

export default ModalUpdateBlog;
