import { Form, Input, Modal } from "antd";

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalCreateAcc = (props: ModalCreateProps) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal
      title="EDIT ACCOUNT"
      open={isOpen}
      width={700}
      footer={[
        <button
          className="mr-3 rounded-md bg-zinc-300 px-4 py-1"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>,
        <button
          type="submit"
          className="rounded-md bg-red-500 px-4 py-1 hover:bg-red-600"
        >
          Edit
        </button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is require!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input className="text-sm" size="large" placeholder="Email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is require!" }]}
        >
          <Input
            className="text-sm"
            type="password"
            size="large"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Full Name is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: "Date of Birth is require!" }]}
        >
          <Input
            className="text-sm"
            type="date"
            size="large"
            placeholder="Date of Birth"
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Address is require!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Address" />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Input
            className="text-sm"
            type="file"
            size="large"
            placeholder="Image"
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Phone is require!" },
            // { type: "number", message: "Phone is a number!" },
          ]}
        >
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
