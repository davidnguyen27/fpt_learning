import React from "react";
import { Form, Input, Modal, Button } from "antd";

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalCreateAcc: React.FC<ModalCreateProps> = ({ isOpen, setIsOpen }) => {
  const handleCancel = () => {
    setIsOpen(false); // Close modal when cancel button is clicked
  };

  return (
    <Modal
      title="EDIT ACCOUNT"
      visible={isOpen} // Use visible instead of open
      width={700}
      onCancel={handleCancel} // Handle cancel event
      footer={[
        <Button
          key="cancel"
          className="mr-3 rounded-md bg-zinc-300 px-4 py-1"
          onClick={handleCancel}
        >
          Cancel
        </Button>,
        <Button
          key="edit"
          className="rounded-md bg-red-500 px-4 py-1 hover:bg-red-600"
        >
          Edit
        </Button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input className="text-sm" size="large" placeholder="Email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required!" }]}
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
          rules={[{ required: true, message: "Full Name is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: "Date of Birth is required!" }]}
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
          rules={[{ required: true, message: "Address is required!" }]}
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
            { required: true, message: "Phone is required!" },
            // { type: "number", message: "Phone is a number!" },
          ]}
        >
          <Input className="text-sm" size="large" placeholder="Phone Number" />
        </Form.Item>
        <Form.Item name="role">
          <select className="rounded-md bg-slate-100 p-4" title="role">
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
