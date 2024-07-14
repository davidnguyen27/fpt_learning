// ModalEditLesson.tsx
import { Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { getLessonAPI } from "../../services/lessonService";
import useEditLesson from "../../hooks/lesson/useEditLesson";

interface ModalEditLessonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  lessonId: string | null;
  onSuccess: () => void;
}

const ModalEditLesson = (props: ModalEditLessonProps) => {
  const { open, setOpen, lessonId, onSuccess } = props;
  const [form] = Form.useForm();
  const { editLesson, loading } = useEditLesson(onSuccess);
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    if (lessonId) {
      getLessonAPI(lessonId)
        .then((data) => {
          console.log(data);
          if (data) {
            const lessonData = {
              name: data.name,
              course_id: data.course_id,
              session_id: data.session_id,
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
        })
        .catch((error) => {
          console.log(error);
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
          {loading ? "Saving..." : "Edit"}
        </button>,
      ]}
    >
      <Form
        layout="horizontal"
        className="mt-4"
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          label="Lesson Name"
          name="name"
          rules={[{ required: true, message: "Lesson Name is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Lesson Name" />
        </Form.Item>
        <Form.Item
          label="Course ID"
          name="course_id"
          rules={[{ required: true, message: "Course ID is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Course ID" />
        </Form.Item>
        <Form.Item
          label="Session ID"
          name="session_id"
          rules={[{ required: true, message: "Session ID is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Session ID" />
        </Form.Item>
        <Form.Item
          label="Lesson Type"
          name="lesson_type"
          rules={[{ required: true, message: "Lesson Type is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Lesson Type" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input className="text-sm" size="large" placeholder="Description" />
        </Form.Item>
        <Form.Item label="Video" name="video_url">
          <Input
            type="url"
            className="text-sm"
            size="large"
            placeholder="Video (url)"
          />
        </Form.Item>
        <Form.Item label="Image" name="image_url">
          <Input
            type="url"
            className="text-sm"
            size="large"
            placeholder="Image (url)"
          />
        </Form.Item>
        <Form.Item
          label="Duration"
          name="full_time"
          rules={[{ required: true, message: "Duration is required!" }]}
        >
          <Input
            type="number"
            className="text-sm"
            size="large"
            placeholder="Duration"
          />
        </Form.Item>
        <Form.Item label="Order" name="position_order">
          <Input
            type="number"
            defaultValue={1}
            className="text-sm"
            size="large"
            placeholder="Order"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditLesson;
