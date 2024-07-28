import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, Button } from "antd";
import useAddCourse from "../../hooks/course/useAddCourse";
import { getCategoriesAPI } from "../../services/coursesService";
import { Category } from "../../models/Category";
import Tiny from "../../app/Editor/RichTextEditor";

const { Option } = Select;

interface ModalAddCourseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const ModalAddCourse = (props: ModalAddCourseProps) => {
  const { open, setOpen, onSuccess } = props;
  const [form] = Form.useForm();
  const { createCourse, loading } = useAddCourse(onSuccess);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategoriesAPI("", 1, 10, false);
        setCategories(categoriesData.data.pageData);
      } catch (error: any) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values before submission:", values); // Debugging
      await createCourse(values);
      form.resetFields();
      setOpen(false);
    } catch (error: any) {
      console.error("Submission error:", error);
      // Display detailed validation errors
      if (error.errorFields) {
        error.errorFields.forEach((field: any) => {
          console.error(`Field: ${field.name}, Error: ${field.errors}`);
        });
      }
      throw new Error(error.message || "Submission failed");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const validateMediaUrl = async (_: any) => {
    const isValidUrl = (url: string) => {
      try {
        const parsedUrl = new URL(url);
        // Ensure it's not a base64 URL
        return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
      } catch {
        return false;
      }
    };
  
    const videoUrl = form.getFieldValue("video_url");
    const imageUrl = form.getFieldValue("image_url");
  
    if (!videoUrl && !imageUrl) {
      return Promise.reject(new Error("Either video URL or image URL is required!"));
    }
    if ((videoUrl && !isValidUrl(videoUrl)) || (imageUrl && !isValidUrl(imageUrl))) {
      return Promise.reject(new Error("Please enter a valid URL!"));
    }
    return Promise.resolve();
  };

  const validateNumber = (_: any, value: string) => {
    if (!value || isNaN(Number(value))) {
      return Promise.reject(new Error("Please enter a valid number!"));
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Add Course"
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={700}
      footer={[
        <Button
          key="cancel"
          className="mr-3"
          onClick={handleCancel}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="rounded-md bg-red-500 px-4 py-1"
          loading={loading}
          onClick={handleSubmit}
        >
          Add
        </Button>,
      ]}
    >
      <Form
        layout="horizontal"
        className="mt-4"
        form={form}
        labelCol={{ span: 5 }}
        labelAlign="left"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Course Name is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Course Name" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true, message: "Category is required!" }]}
        >
          <Select
            placeholder="Select a category"
            loading={categoriesLoading}
            disabled={categoriesLoading}
          >
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
          <Tiny
            value={form.getFieldValue('description') || ''}
            onChange={(value: string) => {
              form.setFieldsValue({ description: value || '' });
            }}
          />
        </Form.Item>

        <Form.Item label="Content" name="content">
          <Input className="text-sm" size="large" placeholder="Content" />
        </Form.Item>

        <Form.Item
          label="Video"
          name="video_url"
          rules={[{ validator: validateMediaUrl }]}
        >
          <Input className="text-sm" size="large" placeholder="Video URL" />
        </Form.Item>
        
        <Form.Item
          label="Image"
          name="image_url"
          rules={[{ validator: validateMediaUrl }]}
        >
          <Input className="text-sm" size="large" placeholder="Image URL" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Price is required!" }, { validator: validateNumber }]}
        >
          <Input
            type="number"
            className="text-sm"
            size="large"
            placeholder="Price"
          />
        </Form.Item>

        <Form.Item
          label="Discount"
          name="discount"
          rules={[{ required: true, message: "Discount is required!" }, { validator: validateNumber }]}
        >
          <Input
            type="number"
            className="text-sm"
            size="large"
            placeholder="Discount"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCourse;
