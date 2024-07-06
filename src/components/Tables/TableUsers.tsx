import { Modal, Space, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../services/usersService"; // Đổi fetchUsers thành getUsers
import { AppDispatch, RootState } from "../../app/redux/store";

const columns = (handleDelete: () => void) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    key: "phone_number",
    dataIndex: "phone_number",
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
    // Thay vì dispatch(fetchUsers()), gọi getUsers từ service
    const fetchData = async () => {
      try {
        const response = await getUsers({
          keyword: "", // Các tham số tìm kiếm tùy thuộc vào yêu cầu của bạn
          role: "all",
          status: true,
          is_delete: false,
        }, {
          pageNum: 1,
          pageSize: 10,
        });
        // Dispatch action để cập nhật state trong redux
        dispatch({ type: 'user/fetchUsersSuccess', payload: response.data });
      } catch (error) {
        dispatch({ type: 'user/fetchUsersError', payload: error.message });
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    return (
      (roleFilter ? user.data.role === roleFilter : true) &&
      (statusFilter ? user.data.status === (statusFilter === "true") : true)
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
