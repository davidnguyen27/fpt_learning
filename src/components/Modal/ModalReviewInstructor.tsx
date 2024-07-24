import { Button, Form, Modal, Space, notification } from "antd";
import { UserData } from "../../models/Types";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { reviewInstructorAPI } from "../../services/usersService";

interface ModalReviewInstructorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: UserData | null;
  refreshData: () => void;
}

const ModalReviewInstructor = (props: ModalReviewInstructorProps) => {
  const { open, setOpen, selectedUser, refreshData } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        user_id: selectedUser._id,
        comment: "",
      });
    }
    console.log("Selected User:", selectedUser);
  }, [selectedUser, form]);

  const handleSubmit = async (values: any) => {
    if (selectedUser) {
      try {
        console.log("Submitting values:", values);
        setLoading(true);
        await reviewInstructorAPI(selectedUser._id, "reject", values.comment);
        notification.success({
          message: "Success",
          description: "Review submitted successfully",
        });
        handleClose();
        refreshData();
      } catch (error: any) {
        notification.error({
          message: "Error",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      title="Review Instructor"
      open={open}
      onOk={form.submit}
      onCancel={handleClose}
      footer={
        <Space>
          <Button type="primary" loading={loading} onClick={form.submit}>
            Send
          </Button>
        </Space>
      }
    >
      {selectedUser && (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            user_id: selectedUser._id,
            comment: "",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: "Please add a comment!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ModalReviewInstructor;
