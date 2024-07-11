import React from "react";
import { Form, Input, message, Modal } from "antd";
import { createUserAPI } from "../../services/usersService";

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fetchUser: () => void;
}

const ModalCreateAcc: React.FC<ModalCreateProps> = ({
  isOpen,
  setIsOpen,
  fetchUser,
}) => {
  const [form] = Form.useForm();

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await createUserAPI(values);
      message.success("User created successfully!");
      fetchUser();
      form.resetFields();

      setIsOpen(false);
    } catch (error: any) {
      message.error(`Error: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title="CREATE ACCOUNT"
      visible={isOpen}
      width={700}
      onCancel={handleCancel}
      footer={[
        <button
          key="cancel"
          className="mr-3 rounded-md bg-zinc-300 px-4 py-1"
          onClick={handleCancel}
        >
          Cancel
        </button>,
        <button
          key="edit"
          className="rounded-md bg-red-500 px-4 py-1 hover:bg-red-600"
          onClick={handleCreate}
        >
          Create
        </button>,
      ]}
    >
      <Form layout="vertical" className="mt-4" form={form}>
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
          name="name"
          rules={[{ required: true, message: "Full Name is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Full Name" />
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
