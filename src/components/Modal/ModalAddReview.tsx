import { FC, useEffect, useRef, useCallback } from "react";
import { Modal, Form, Input, Rate, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Review } from "../../models/Review";

interface ModalAddReviewProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reviewData: Review) => void;
  course_id: string;
}

const ModalAddReview: FC<ModalAddReviewProps> = ({
  visible,
  onClose,
  onSubmit,
  course_id,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const messageShown = useRef(false);

  const checkAuth = useCallback(() => {
    const token = sessionStorage.getItem("token");
    if (!token && !messageShown.current) {
      message.warning("Please sign in to add a review");
      messageShown.current = true;
      onClose();
      navigate("/sign-in");
    }
  }, [navigate, onClose]);

  useEffect(() => {
    if (visible) {
      checkAuth();
    } else {
      // Reset the flag when the modal is closed
      messageShown.current = false;
    }
  }, [visible, checkAuth]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({ course_id, ...values });
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal title="Add Review" open={visible} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical" name="review_form">
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please give a rating" }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Comment"
          rules={[{ required: true, message: "Please enter a comment" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddReview;
