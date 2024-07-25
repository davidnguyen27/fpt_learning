import { useEffect, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import useAddLesson from "../../hooks/lesson/useAddLesson";
import { getCoursesAPI, getSessionsAPI } from "../../services/lessonService";
import { Course } from "../../models/Course";
import { Session } from "../../models/Session";
import Editor from "../../app/Editor/RichTextEditor";
import Tiny from "../../app/Editor/RichTextEditor";

const { Option } = Select;

interface ModalAddLessonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const lessonTypes = ["text", "video", "image"];

const ModalAddLesson = (props: ModalAddLessonProps) => {
  const { open, setOpen, onSuccess } = props;
  const [form] = Form.useForm();
  const { createLesson, loading } = useAddLesson(onSuccess);

  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [sessionsLoading, setSessionsLoading] = useState<boolean>(false);
  const [lessonType, setLessonType] = useState<string>("text");

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

  const handleCourseChange = async (courseId: string) => {
    form.setFieldsValue({ session_id: undefined }); // Reset session field
    setSessionsLoading(true);
    try {
      const sessionsData = await getSessionsAPI("", 1, 10, false);
      setSessions(
        sessionsData.data.pageData.filter(
          (session: Session) => session.course_id === courseId,
        ),
      );
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleLessonTypeChange = (value: string) => {
    setLessonType(value);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createLesson(values);
      form.resetFields();
      setOpen(false);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <Modal
      title="Add Lesson"
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
      >
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
            onChange={handleCourseChange}
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
            disabled={sessionsLoading || !form.getFieldValue("course_id")}
          >
            {sessions.map((session) => (
              <Option key={session._id} value={session._id}>
                {session.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Lesson Type"
          name="lesson_type"
          rules={[{ required: true, message: "Lesson Type is required!" }]}
        >
          <Select
            placeholder="Select lesson type"
            onChange={handleLessonTypeChange}
          >
            {lessonTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {lessonType === "text" && (
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
        )}

        {lessonType === "video" && (
          <Form.Item
            label="Video URL"
            name="video_url"
            rules={[
              {
                required: true,
                message: "Video URL is required for video lessons!",
              },
            ]}
          >
            <Input className="text-sm" size="large" placeholder="Video URL" />
          </Form.Item>
        )}

        {lessonType === "image" && (
          <Form.Item
            label="Image URL"
            name="image_url"
            rules={[
              {
                required: true,
                message: "Image URL is required for image lessons!",
              },
            ]}
          >
            <Input className="text-sm" size="large" placeholder="Image URL" />
          </Form.Item>
        )}

        <Form.Item label="Position Order" name="position_order">
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

export default ModalAddLesson;
