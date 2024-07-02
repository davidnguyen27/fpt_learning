import { Modal, Space, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../app/redux/user/userSlice";
import { AppDispatch, RootState } from "../../app/redux/store";

const columns = (handleDelete: () => void) => [
  {
    title: "Name",
    dataIndex: "fullName",
    key: "fullName",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status: boolean) => <Switch checked={status} />,
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "Action",
    key: "action",

    render: () => (
      <Space size="middle">
        <a>
          <i className="fa-solid fa-file-pen"></i>
        </a>
        <a onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </a>
      </Space>
    ),
  },
];

const TableUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, roleFilter, statusFilter } = useSelector(
    (state: RootState) => state.user,
  );

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    return (
      (roleFilter ? user.role === roleFilter : true) &&
      (statusFilter ? user.status === (statusFilter === "true") : true)
    );
  });

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Table
        className="my-5 rounded-none"
        columns={columns(handleDelete)}
        dataSource={filteredUsers}
      />
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  );
};

export default TableUsers;
