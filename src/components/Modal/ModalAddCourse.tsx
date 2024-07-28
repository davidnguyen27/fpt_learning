import { useEffect, useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
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
        throw new Error(error.message);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const description = values.description;
      if (typeof description !== "string" || description.trim() === "") {
        throw new Error("Description must be a non-empty string");
      }

      await createCourse(values);
      form.resetFields();
      setOpen(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Add Course"
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
          {loading ? "Adding..." : "Add"}
        </button>,
      ]}
    >
      <Form
        layout="horizontal"
        className="mt-4"
        form={form}
        labelCol={{ span: 4 }}
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
          // valuePropName="value"
          // getValueFromEvent={(e: any) => e.target.getContent()}
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Tiny
            value={form.getFieldValue("description") || ""}
            onChange={(value: any) =>
              form.setFieldsValue({ description: value })
            }
          />
        </Form.Item>

        <Form.Item label="Content" name="content">
          <Input className="text-sm" size="large" placeholder="Content" />
        </Form.Item>

        <Form.Item
          label="Video"
          name="video_url"
          rules={[{ required: true, message: "Video is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Video URL" />
        </Form.Item>

        <Form.Item label="Image" name="image_url">
          <Input className="text-sm" size="large" placeholder="Image URL" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Price is required!" }]}
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
          rules={[{ required: true, message: "Discount is required!" }]}
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
