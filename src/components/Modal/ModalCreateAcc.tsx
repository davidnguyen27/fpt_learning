import { Form, Input, Modal } from "antd";

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalCreateAcc = (props: ModalCreateProps) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal
      title="CREATE ACCOUNT"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => setIsOpen(false)}
      width={700}
    >
      <Form className="mt-4">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input className="text-sm" size="large" placeholder="Email address" />
        </Form.Item>
        <Form.Item name="password">
          <Input className="text-sm" size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item name="fullName">
          <Input className="text-sm" size="large" placeholder="Full Name" />
        </Form.Item>
        <Form.Item name="dateOfBirth">
          <Input
            className="text-sm"
            type="date"
            size="large"
            placeholder="Date of Birth"
          />
        </Form.Item>
        <Form.Item name="address">
          <Input className="text-sm" size="large" placeholder="Address" />
        </Form.Item>
        <Form.Item name="image">
          <Input
            className="text-sm"
            type="file"
            size="large"
            placeholder="Image"
          />
        </Form.Item>
        <Form.Item name="phone">
          <Input className="text-sm" size="large" placeholder="Phone Number" />
        </Form.Item>
        <Form.Item name="role">
          <select className="rounded-md bg-slate-100 p-4">
            <option className="mb-2 p-2" value="admin">
              Admin
            </option>
            <option className="mb-2 p-2" value="instructor">
              Instructor
            </option>
            <option className="mb-2 p-2" value="student">
              Student
            </option>
          </select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateAcc;
