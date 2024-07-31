import { FC } from 'react';
import { Modal, Form, Input, Rate } from 'antd';
import { Review } from '../../models/Review';

interface ModalAddReviewProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reviewData: Review ) => void;
  course_id: string;  // Include course_id in the props
}

const ModalAddReview: FC<ModalAddReviewProps> = ({ visible, onClose, onSubmit, course_id }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onSubmit({ course_id, ...values });  // Include course_id in the submitted data
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal title="Add Review" visible={visible} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical" name="review_form">
        <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please give a rating' }]}>
          <Rate />
        </Form.Item>
        <Form.Item name="comment" label="Comment" rules={[{ required: true, message: 'Please enter a comment' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddReview;
