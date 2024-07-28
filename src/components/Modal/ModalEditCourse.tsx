import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import useEditCourse from "../../hooks/course/useEditCourse";
import { getCategoriesAPI, getCourseAPI } from "../../services/coursesService";
import { Category } from "../../models/Category";
import { RuleObject } from "antd/es/form";

const { Option } = Select;

interface ModalEditCourseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  courseId: string | null;
}

const ModalEditCourse = (props: ModalEditCourseProps) => {
  const { open, setOpen, onSuccess, courseId } = props;
  const [form] = Form.useForm();
  const { editCourse, loading } = useEditCourse(onSuccess);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] = useState<any>({});

  // Fetch categories only once when the component mounts
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

  // Fetch course data when courseId or open changes
  useEffect(() => {
    if (open && courseId) {
      const fetchCourseData = async () => {
        try {
          const data = await getCourseAPI(courseId);
          if (data) {
            const courseData = {
              name: data.name,
              category_id: data.category_id,
              description: data.description,
              content: data.content,
              video_url: data.video_url,
              image_url: data.image_url,
              price: data.price,
              discount: data.discount,
            };
            setInitialValues(courseData);
            form.setFieldsValue(courseData);
          } else {
            message.error("No course found with the given ID");
          }
        } catch (error) {
          console.error(error);
          message.error("Failed to fetch course data");
        }
      };

      fetchCourseData();
    } else {
      form.resetFields();
      setInitialValues({});
    }
  }, [open, courseId, form]);

  const validateMediaUrls = (_: RuleObject) => {
    const video_url = form.getFieldValue("video_url");
    const image_url = form.getFieldValue("image_url");

    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (!video_url && !image_url) {
      return Promise.reject(new Error("Either video URL or image URL is required!"));
    }
    if ((video_url && !isValidUrl(video_url)) || (image_url && !isValidUrl(image_url))) {
      return Promise.reject(new Error("Please enter a valid URL!"));
    }
    return Promise.resolve();
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      if (courseId) {
        await editCourse(courseId, values);
        form.resetFields();
        setOpen(false);
        onSuccess(); // This should trigger the refetchData in TableCourses
      }
    } catch (error) {
      message.error("Failed to update course");
    }
  };


  return (
    <Modal
      title="Edit Course"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleEdit}
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
          onClick={handleEdit}
        >
          {loading ? "Updating..." : "Update"}
        </button>,
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

        <Form.Item
          label="Video URL"
          name="video_url"
          rules={[{ validator: validateMediaUrls }]}
        >
          <Input className="text-sm" size="large" placeholder="Video URL" />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image_url"
          rules={[{ validator: validateMediaUrls }]}
        >
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

export default ModalEditCourse;
