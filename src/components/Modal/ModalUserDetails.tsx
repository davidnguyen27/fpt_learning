import React from "react";
import { Modal } from "antd";
import { UserData } from "../../models/Types";

interface ModalUserDetailsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: UserData | null;
}

const ModalUserDetails: React.FC<ModalUserDetailsProps> = (props) => {
  const { open, setOpen, selectedUser } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="User Details"
      visible={open}
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
    >
      {selectedUser && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={selectedUser.avatar || "/path/to/default-avatar.png"}
            alt="Avatar"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              marginRight: 20,
            }}
          />
          <div>
            <p>
              <strong className="mb-5">Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedUser.status ? "Active" : "Inactive"}
            </p>
            <p>
              <strong>Verified:</strong>{" "}
              {selectedUser.is_verified ? "Yes" : "No"}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalUserDetails;
