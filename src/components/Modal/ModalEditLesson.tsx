import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import useEditLesson from "../../hooks/lesson/useEditLesson";
import { getSessionsAPI, getLessonAPI, getCoursesAPI } from "../../services/lessonService";
import { Session } from "../../models/Session";
import { Course } from "../../models/Course";

const { Option } = Select;

interface ModalEditLessonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  lessonId: string | null;
}

const ModalEditLesson = (props: ModalEditLessonProps) => {
  const { open, setOpen, onSuccess, lessonId } = props;
  const [form] = Form.useForm();
  const { editLesson, loading } = useEditLesson(onSuccess);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState<boolean>(true);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] = useState<any>({});

  // Fetch sessions data
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionsData = await getSessionsAPI("", 1, 100, false);
        console.log("Sessions Data:", sessionsData); // Log the fetched sessions
        setSessions(sessionsData.data.pageData);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        message.error("Failed to fetch sessions");
      } finally {
        setSessionsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Fetch courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCoursesAPI("", 1, 100, false);
        console.log("Courses Data:", coursesData); // Log the fetched courses
        setCourses(coursesData.data.pageData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        message.error("Failed to fetch courses");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch lesson data
  useEffect(() => {
      if (lessonId) {
        getLessonAPI(lessonId)
        .then((data) => {
          if (data) {
            const lessonData = {
              name: data.name,
              course_id: data.course_id,
              session_id: data.session_id,// Add this line if `course_id` is used
              lesson_type: data.lesson_type,
              description: data.description,
              video_url: data.video_url,
              image_url: data.image_url,
              full_time: data.full_time,
              position_order: data.position_order,
            };
            setInitialValues(lessonData);
            form.setFieldsValue(lessonData);
          } else {
            message.error("No lesson found with the given ID");
          }
        }) .catch ((error)=> {
          console.error("Failed to fetch lesson data:", error);
          message.error("Failed to fetch lesson data");
        });
      } else {
        form.resetFields();
        setInitialValues({});
      }
  }, [lessonId, form]);

  useEffect(() => {
    if (open && lessonId) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, open, form, lessonId]);

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      values.full_time = Number(values.full_time);
      values.position_order = Number(values.position_order);
      if (lessonId) {
        await editLesson(lessonId, values);
        form.resetFields();
        setOpen(false);
        message.success("Lesson updated successfully");
      }
    } catch (error) {
      message.error("Failed to update lesson");
    }
  };

  const validateNumber = (_: any, value: string) => {
    if (value && isNaN(Number(value))) {
      return Promise.reject(new Error("Position Order must be a valid number!"));
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Edit Lesson"
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
          {loading ? "Saving..." : "Save"}
        </button>,
      ]}
    >
      <Form layout="horizontal" className="mt-4" form={form} labelCol={{ span: 4 }} initialValues={initialValues}>
        <Form.Item
          label="Lesson Name"
          name="name"
          rules={[{ required: true, message: "Lesson Name is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Lesson Name" />
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
          label="Session"
          name="session_id"
          rules={[{ required: true, message: "Session is required!" }]}
        >
          <Select
            placeholder="Select a session"
            loading={sessionsLoading}
            disabled={sessionsLoading}
          >
            {sessions.map((session) => (
              <Option key={session._id} value={session._id}>
                {session.name}
              </Option>
            ))}
          </Select>
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
          label="Lesson Type"
          name="lesson_type"
          rules={[{ required: true, message: "Lesson Type is required!" }]}
        >
          <Select placeholder="Select lesson type">
            <Option value="text">Text</Option>
            <Option value="video">Video</Option>
            <Option value="image">Image</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required for text lessons!" }]}
        >
          <Input.TextArea className="text-sm" size="large" placeholder="Description" />
        </Form.Item>

        <Form.Item
          label="Video URL"
          name="video_url"
          rules={[{ required: true, message: "Video URL is required for video lessons!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Video URL" />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image_url"
          rules={[{ required: true, message: "Image URL is required for image lessons!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Image URL" />
        </Form.Item>

        <Form.Item
          label="Position Order"
          name="position_order"
          rules={[{ validator: validateNumber }]}
        >
          <Input className="text-sm" size="large" placeholder="99" />
        </Form.Item>

        <Form.Item
          label="Full time"
          name="full_time"
          rules={[{ required: true, message: "Full time is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditLesson;
