import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, Button } from "antd";
import useAddSession from "../../hooks/session/useAddSession";
import { getCoursesAPI } from "../../services/sessionService";
import { Course } from "../../models/Course";

const { Option } = Select;

interface ModalAddSessionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const ModalAddSession = (props: ModalAddSessionProps) => {
  const { open, setOpen, onSuccess } = props;
  const [form] = Form.useForm();
  const { createSession, loading } = useAddSession(onSuccess);

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCoursesAPI("", 1, 10, false);
        setCourses(coursesData.data.pageData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createSession(values);
      form.resetFields();
      setOpen(false);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const validateNumber = (_: any, value: string) => {
    if (value && isNaN(Number(value))) {
      return Promise.reject(new Error("Position Order must be a valid number!"));
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Add Session"
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
          loading={loading}
          className="rounded-md bg-red-500 px-4 py-1"
          onClick={handleSubmit}
        >
          {loading ? "Adding..." : "Add"}
        </Button>,
      ]}
    >
      <Form
        layout="horizontal"
        className="mt-4"
        form={form}
        labelCol={{ span: 5 }}
        initialValues={{ position_order: 99 }}
      >
        <Form.Item
          label="Session Name"
          name="name"
          rules={[{ required: true, message: "Session Name is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Session Name" />
        </Form.Item>

        <Form.Item
          label="Course"
          name="course_id"
          rules={[{ required: true, message: "Course is required!" }]}
        >
          <Select
            placeholder="Select a course"
            loading={coursesLoading}
            disabled={coursesLoading}
          >
            {courses.map((course) => (
              <Option key={course._id} value={course._id}>
                {course.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input className="text-sm" size="large" placeholder="" />
        </Form.Item>

        <Form.Item
          label="Position Order"
          name="position_order"
          rules={[{ validator: validateNumber }]}
        >
          <Input className="text-sm" size="large" placeholder="99" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddSession;
