import React from "react";
import { Form, Input, message, Modal } from "antd";
import { createSessionAPI } from "../../services/sessionService";

interface ModalCreateProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalCreateSession: React.FC<ModalCreateProps> = ({ isOpen, setIsOpen }) => {
  const [form] = Form.useForm();

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await createSessionAPI(values);
      message.success("Session created successfully!");
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
      title="CREATE SESSION"
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
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Name is required!" },
            { type: "string", message: "Please enter a valid name address!" },
          ]}
        >
          <Input className="text-sm" size="large" placeholder="Session name" />
        </Form.Item>
        <Form.Item
          label="Course Id"
          name="course_id"
          rules={[{ required: true, message: "Course Id is required!" }]}
        >
          <Input
            className="text-sm"
            type="string"
            size="large"
            placeholder="Course Id"
          />
        </Form.Item>
        <Form.Item
          label="Position Order"
          name="position_order"
          rules={[{ required: true, message: "Position order is required!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Full Name" />
        </Form.Item>
        {/* <Form.Item name="role">
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
        </Form.Item> */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <Input
            className="text-sm"
            type="string"
            size="large"
            placeholder="Description"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateSession;