import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import useEditSession from "../../hooks/session/useEditSession";
import { getCoursesAPI, getSessionAPI } from "../../services/sessionService";
import { Course } from "../../models/Course";

const { Option } = Select;

interface ModalEditSessionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  sessionId: string | null;
}

const ModalEditSession = (props: ModalEditSessionProps) => {
  const { open, setOpen, onSuccess, sessionId } = props;
  const [form] = Form.useForm();
  const { editSession, loading } = useEditSession(onSuccess);

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] = useState<any>({});

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesAPI("", 1, 10, false);
        setCourses(response.data.pageData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        message.error("Failed to fetch courses");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch session data when sessionId changes
  useEffect(() => {
    if (sessionId) {
      const fetchSession = async () => {
        try {
          const sessionData = await getSessionAPI(sessionId);
          const sessionValues = {
            name: sessionData.name,
            course_id: sessionData.course_id,
            description: sessionData.description,
            position_order: sessionData.position_order,
          };
          setInitialValues(sessionValues);
          form.setFieldsValue(sessionValues);
        } catch (error) {
          console.error("Failed to fetch session data:", error);
          message.error("Failed to fetch session data");
        }
      };

      fetchSession();
    } else {
      form.resetFields();
      setInitialValues({});
    }
  }, [sessionId, form]);

  // Reset form fields when modal opens
  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  // Handle form submission
  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      if (sessionId) {
        await editSession(sessionId, values);
        form.resetFields();
        setOpen(false);
        message.success("Session updated successfully");
      }
    } catch (error) {
      message.error("Failed to update session");
    }
  };

  return (
    <Modal
      title="Edit Session"
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
      <Form layout="horizontal" className="mt-4" form={form} labelCol={{span: 4}} initialValues={initialValues}>
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

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="" />
        </Form.Item>

        <Form.Item label="Position Order" name="position_order">
          <Input className="text-sm" size="large" placeholder="1-99" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditSession;
