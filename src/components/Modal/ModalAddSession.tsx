import { useEffect, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import useAddSession from "../../hooks/session/useAddSession";
import { getCoursesAPI } from "../../services/sessionService";
import { Course } from "../../models/Course";
import Tiny from "../../app/Editor/RichTextEditor";

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

  return (
    <Modal
      title="Add Session"
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

        <Form.Item
          label="Description"
          name="description"
          valuePropName="value"
          getValueFromEvent={(e: any) => e.target.getContent()}
        >
          <Tiny
            value={form.getFieldValue('description') || ''}
            onChange={(value: any) => form.setFieldsValue({ description: value })}
          />
        </Form.Item>

        <Form.Item label="Order" name="position_order">
          <Input className="text-sm" size="large" placeholder="99" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddSession;
