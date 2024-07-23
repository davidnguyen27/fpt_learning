import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { getCategoriesAPI } from "../../services/coursesService";
import { Category } from "../../models/Category";
import useAddCourse from "../../hooks/course/useAddCourse";

const { Option } = Select;

interface FormCreateCourseProp {
  onSuccess: () => void;
}

const FormCreateCourse: React.FC<FormCreateCourseProp> = ({ onSuccess }) => {
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form] = Form.useForm();
  const { createCourse } = useAddCourse(onSuccess);

  // State to manage field disable status
  const [videoDisabled, setVideoDisabled] = useState<boolean>(false);
  const [imageDisabled, setImageDisabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategoriesAPI("", 1, 10, false);
        setCategories(categoriesData.data.pageData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFieldChange = (changedValues: any) => {
    const { video_url, image_url } = changedValues;

    // Toggle disable status based on field values
    setVideoDisabled(Boolean(image_url));
    setImageDisabled(Boolean(video_url));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createCourse(values);
      form.resetFields();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onValuesChange={handleFieldChange}>
        <div className="bg-slate-200 p-6">
          <Form.Item
            label="Course Name"
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
            <Input className="text-sm" size="large" placeholder="Description" />
          </Form.Item>

          <Form.Item label="Content" name="content">
            <Input className="text-sm" size="large" placeholder="Content" />
          </Form.Item>

          <Form.Item label="Video" name="video_url" >
            <Input
              className="text-sm"
              size="large"
              placeholder="Video URL"
              disabled={videoDisabled}
            />
          </Form.Item>

          <Form.Item label="Image" name="image_url" >
            <Input
              className="text-sm"
              size="large"
              placeholder="Image URL"
              disabled={imageDisabled}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required!" }]}
          >
            <Input className="text-sm" size="large" placeholder="Price" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Discount is required!" }]}
          >
            <Input className="text-sm" size="large" placeholder="Discount" />
          </Form.Item>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="text-white bg-red-500 px-10 py-3 hover:bg-red-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default FormCreateCourse;
