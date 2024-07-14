import { Form, Input, Modal } from "antd";
import useAddLesson from "../../hooks/lesson/useAddLesson";

interface ModalAddLessonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const ModalAddLesson = (props: ModalAddLessonProps) => {
  const { open, setOpen, onSuccess } = props;
  const [form] = Form.useForm();
  const { createLesson, loading } = useAddLesson(onSuccess);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.full_time = Number(values.full_time);
      values.position_order = Number(values.position_order);
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
          {loading ? "Add" : "Add..."}
        </button>,
      ]}
    >
      <Form layout="horizontal" className="mt-4" form={form}>
        <Form.Item
          label="Lesson Name"
          name="name"
          rules={[{ required: true, message: "Lesson Name is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Lesson Name" />
        </Form.Item>
        <Form.Item
          label="Course ID"
          name="course_id"
          rules={[{ required: true, message: "Course ID is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Course ID" />
        </Form.Item>
        <Form.Item
          label="Session ID"
          name="session_id"
          rules={[{ required: true, message: "Session ID is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Session ID" />
        </Form.Item>
        <Form.Item
          label="Lesson Type"
          name="lesson_type"
          rules={[{ required: true, message: "Lesson Type is require!" }]}
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
          rules={[{ required: true, message: "Duration is require!" }]}
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

export default ModalAddLesson;
