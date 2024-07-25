import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import useEditLesson from "../../hooks/lesson/useEditLesson";
import { getSessionsAPI, getLessonAPI, getCoursesAPI } from "../../services/lessonService";
import { Session } from "../../models/Session";
import { Course } from "../../models/Course";
import { Lesson } from "../../models/Lesson"; // Import Lesson type

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
  const [sessionsLoading, setSessionsLoading] = useState<boolean>(false);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [lessonType, setLessonType] = useState<string>("");
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null); // Track current lesson

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCoursesAPI("", 1, 100, false);
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

  const fetchSessions = async (courseId: string) => {
    if (!courseId) {
      setSessions([]);
      return;
    }
    setSessionsLoading(true);
    try {
      const sessionsData = await getSessionsAPI("", 1, 100, false);
      const filteredSessions = sessionsData.data.pageData.filter((session: Session) => session.course_id === courseId);
      setSessions(filteredSessions);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      message.error("Failed to fetch sessions");
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleCourseChange = (courseId: string) => {
    form.setFieldsValue({ session_id: undefined });
    fetchSessions(courseId);
  };

  useEffect(() => {
    if (open && lessonId) {
      getLessonAPI(lessonId)
        .then((data: Lesson) => {
          if (data) {
            const lessonData = {
              name: data.name,
              course_id: data.course_id,
              session_id: data.session_id,
              lesson_type: data.lesson_type,
              description: data.description || "",
              video_url: data.video_url || "",
              image_url: data.image_url || "",
              full_time: data.full_time || 0,
              position_order: data.position_order || 99,
            };
            form.setFieldsValue(lessonData);
            setLessonType(data.lesson_type);
            setCurrentLesson(data); // Set current lesson with user_id
            if (data.course_id) {
              fetchSessions(data.course_id);
            }
          } else {
            message.error("No lesson found with the given ID");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch lesson data:", error);
          message.error("Failed to fetch lesson data");
        });
    } else {
      form.resetFields();
      setCurrentLesson(null); // Clear current lesson when modal is closed
    }
  }, [open, lessonId, form]);

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      values.description = values.description || "";
      values.video_url = values.video_url || "";
      values.image_url = values.image_url || "";
      values.full_time = Number(values.full_time);
      values.position_order = Number(values.position_order);

      if (lessonId && currentLesson) {
        const lessonToUpdate = {
          ...values,
          user_id: currentLesson.user_id, // Use user_id from currentLesson
        };
        await editLesson(lessonId, lessonToUpdate);
        form.resetFields();
        setOpen(false);
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

  const handleLessonTypeChange = (value: string) => {
    setLessonType(value);
    if (value === "text") {
      form.setFieldsValue({ video_url: "", image_url: "" });
    } else if (value === "video") {
      form.setFieldsValue({ description: "", image_url: "" });
    } else if (value === "image") {
      form.setFieldsValue({ description: "", video_url: "" });
    }
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
      <Form layout="horizontal" className="mt-4" form={form} labelCol={{ span: 4 }}>
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
            disabled={!form.getFieldValue('course_id') || sessionsLoading}
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
          <Select placeholder="Select lesson type" onChange={handleLessonTypeChange}>
            <Option value="text">Text</Option>
            <Option value="video">Video</Option>
            <Option value="image">Image</Option>
          </Select>
        </Form.Item>

        {lessonType === "text" && (
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false }]}
          >
            <Input.TextArea className="text-sm" size="large" placeholder="Description" />
          </Form.Item>
        )}

        {lessonType === "video" && (
          <Form.Item
            label="Video URL"
            name="video_url"
            rules={[{ required: false }]}
          >
            <Input className="text-sm" size="large" placeholder="Video URL" />
          </Form.Item>
        )}

        {lessonType === "image" && (
          <Form.Item
            label="Image URL"
            name="image_url"
            rules={[{ required: false }]}
          >
            <Input className="text-sm" size="large" placeholder="Image URL" />
          </Form.Item>
        )}

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
