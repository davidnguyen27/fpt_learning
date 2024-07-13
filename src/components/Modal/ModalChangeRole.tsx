import { Form, Modal, notification } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import { useEffect, useState } from "react";
import { changeUserRole } from "../../app/redux/user/userSlice";

interface ModalChangeRoleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
  currentRole: string;
}

const ModalChangeRole: React.FC<ModalChangeRoleProps> = (props) => {
  const { open, setOpen, userId, currentRole } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [role, setRole] = useState<string>(currentRole);

  useEffect(() => {
    if (open) {
      setRole(currentRole);
    }
  }, [open, currentRole]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleChangeRole = async () => {
    try {
      await dispatch(changeUserRole({ userId, role })).unwrap();
      notification.success({ message: "Role changed successfully" });
      setOpen(false);
    } catch (error) {
      notification.error({ message: "Failed to change role" });
    }
  };

  return (
    <Modal
      title="Change Role"
      visible={open}
      width={700}
      onCancel={() => setOpen(false)}
      footer={[
        <button
          key="cancel"
          className="mr-3 rounded-md bg-zinc-300 px-4 py-1"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>,
        <button
          key="create"
          className="rounded-md bg-red-500 px-4 py-1 hover:bg-red-600"
          onClick={handleChangeRole}
        >
          Change
        </button>,
      ]}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item name="role">
          <select
            className="rounded-md bg-slate-100 p-4"
            title="role"
            value={role}
            onChange={handleRoleChange}
          >
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

export default ModalChangeRole;
