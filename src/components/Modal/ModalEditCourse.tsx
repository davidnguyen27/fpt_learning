import { Modal, Form, Input, Select, Button } from "antd";
import { Course } from "../../models/Course";

const { Option } = Select;

interface ModalEditCourseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  course: Course["pageData"][number];
  editCourse: (
    courseId: string,
    courseData: Partial<Course["pageData"][number]>,
  ) => Promise<void>;
  editLoading: boolean;
}

const ModalEditCourse: React.FC<ModalEditCourseProps> = ({
  open,
  setOpen,
  course,
  editCourse,
  editLoading,
}) => {
  const [form] = Form.useForm();

  const handleUpdateCourse = async (
    values: Partial<Course["pageData"][number]>,
  ) => {
    await editCourse(course._id, values);
    setOpen(false);
  };

  return (
    <Modal
      title="Chỉnh sửa khóa học"
      visible={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateCourse}
        initialValues={course}
      >
        <Form.Item
          name="course_name"
          label="Tên khóa học"
          rules={[{ required: true, message: "Vui lòng nhập tên khóa học!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category_name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select>
            <Option value="Active">Hoạt động</Option>
            <Option value="Inactive">Không hoạt động</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={editLoading}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditCourse;
