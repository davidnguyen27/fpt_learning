import React, { useEffect, useState } from "react";
import { Table, Modal, Tooltip, Input, Select, Tag } from "antd";
import { UserData, UserSearchRequest } from "../../models/Types";
import { deleteUser, getUsers, toggleUserStatus, updateUser } from "../../services/usersService";
import { DeleteOutlined, EditOutlined, UserDeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import ModalCreateAcc from "../../components/Modal/ModalCreateAcc";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

const TableUsers: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserData | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, [
    searchText,
    roleFilter,
    statusFilter,
    pagination.current,
    pagination.pageSize,
  ]);

  const fetchUsers = async (page: number = 1, pageSize: number = 10) => {
    const requestData: UserSearchRequest = {
      searchCondition: {
        keyword: searchText.trim(),
        role: roleFilter,
        status: statusFilter,
        is_delete: false,
      },
      pageInfo: {
        pageNum: page,
        pageSize: pageSize,
      },
    };

    try {
      const response = await getUsers(requestData);
      setUsers(response.data.pageData);
      setPagination({
        ...pagination,
        total: response.data.pageInfo.totalItems,
        current: response.data.pageInfo.pageNum,
        pageSize: response.data.pageInfo.pageSize,
      });
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (user: UserData) => {
    setEditedUser(user);
    setIsEditModalVisible(true);
  };

  const handleUpdateConfirm = async (updatedUserData: Partial<UserData>) => {
    if (editedUser) {
      try {
        const updatedUser = await updateUser(editedUser._id, updatedUserData);
        setEditedUser(null);
        setIsEditModalVisible(false);
        fetchUsers(pagination.current, pagination.pageSize);
        console.log("Updated user:", updatedUser);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const handleNameClick = (user: UserData) => {
    setSelectedUserDetail(user);
    setDetailModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setEditedUser(null);
    setIsEditModalVisible(false);
    setEditedUser(null);
    setIsEditModalVisible(false);
  };

  const handleDelete = (user: UserData) => {
    setSelectedUser(user);
    setIsModalVisible(true);
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser._id);
        setIsModalVisible(false);
        fetchUsers(pagination.current, pagination.pageSize);
        await deleteUser(selectedUser._id);
        setIsModalVisible(false);
        fetchUsers(pagination.current, pagination.pageSize);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setSearchText(e.target.value);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setRoleFilter(value);
  };

  const handleStatusFilterChange = (value: boolean) => {
    setStatusFilter(value);
  };

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedUserDetail(null);
  };

  const handleStatusChange = (user: UserData, newStatus: boolean) => {
    if (newStatus !== user.status) {
      setSelectedUser(user);
      setIsModalVisible(true);
    } else {
      console.log("Status remains unchanged");
    }
  };

  const handleConfirmStatusChange = async () => {
    if (selectedUser) {
      try {
        await toggleUserStatus(selectedUser._id, !selectedUser.status);
        fetchUsers(pagination.current, pagination.pageSize);
      } catch (error) {
        console.error("Failed to update status:", error);
      } finally {
        setIsModalVisible(false);
        setSelectedUser(null);
      }
    }
  };

  const handleCancelStatusChange = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_: any, __: any, index: number) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: UserData) => (
        <a onClick={() => handleNameClick(record)} style={{ cursor: "pointer" }}>
          {name}
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Is Verified",
      dataIndex: "is_verified",
      key: "is_verified",
      render: (isVerified: boolean) => (
        <Tag color={isVerified ? "green" : "volcano"}>
          {isVerified ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: UserData) => (
        <div>
          {status ? (
            <button
              className="bg-red-500 px-3 py-1 text-white rounded-md"
              onClick={() => handleStatusChange(record, false)}
            >
              <UserDeleteOutlined />
              
            </button>
          ) : (
            <button
              className="bg-green-500 px-3 py-1 text-white rounded-md"
              onClick={() => handleStatusChange(record, true)}
            >
              <UserAddOutlined />
             
            </button>
          )}
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color="geekblue">{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: UserData) => (
        <div>
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => handleUpdate(record)}
              style={{ fontSize: "16px", marginRight: 16, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={() => handleDelete(record)}
              style={{ fontSize: "16px", color: "red", cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search by name or email"
            allowClear
            onSearch={handleSearch}
            onChange={handleSearchChange}
            style={{ width: 300, marginRight: 16 }}
          />
          <Select
            style={{ width: 150, marginRight: 16 }}
            placeholder="Select role"
            onChange={handleRoleFilterChange}
            value={roleFilter}
          >
            <Option value="all">All Roles</Option>
            <Option value="admin">Admin</Option>
            <Option value="instructor">Instructor</Option>
            <Option value="student">Student</Option>
          </Select>
          <Select
            style={{ width: 150 }}
            placeholder="Select status"
            onChange={handleStatusFilterChange}
            value={statusFilter}
          >
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </div>
        <div>
          <button
            className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
            onClick={() => setIsOpen(true)}
          >
            Create account
          </button>
          <ModalCreateAcc isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <Table
        className="my-5 rounded-none"
        columns={columns}
        dataSource={users}
        rowKey={(record) => record._id}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onOk={() => editedUser && handleUpdateConfirm(editedUser)}
        onCancel={handleUpdateCancel}
        okText="Update"
        cancelText="Cancel"
      >
        {editedUser && (
          <div>
            <p>Name:</p>
            <Input
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
              placeholder="Enter name"
              style={{ marginBottom: 16 }}
            />
            <p>Email:</p>
            <Input
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              placeholder="Enter email"
              style={{ marginBottom: 16 }}
            />
            <p>Avatar:</p>
            <Input
              value={editedUser.avatar}
              onChange={(e) =>
                setEditedUser({ ...editedUser, avatar: e.target.value })
              }
              placeholder="Add Avatar Link"
              style={{ marginBottom: 16 }}
            />
            <p>Video:</p>
            <Input
              value={editedUser.video}
              onChange={(e) =>
                setEditedUser({ ...editedUser, video: e.target.value })
              }
              placeholder="Add Video Link"
              style={{ marginBottom: 16 }}
            />
          </div>
        )}
      </Modal>
      <Modal
        title={`Confirm ${selectedUser?.status ? 'Shut Down' : 'Turn On'} User`}
        visible={isModalVisible}
        onOk={handleConfirmStatusChange}
        onCancel={handleCancelStatusChange}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to {selectedUser?.status ? 'shut down' : 'turn on'} this user?
        </p>
      </Modal>
      <Modal
        title="User Details"
        visible={detailModalVisible}
        onOk={handleCloseDetailModal}
        onCancel={handleCloseDetailModal}
        footer={null}
      >
        {selectedUserDetail && (
          <div>
            <p>Name: {selectedUserDetail.name}</p>
            <p>Email: {selectedUserDetail.email}</p>
            <p>Role: {selectedUserDetail.role}</p>
            <p>Status: {selectedUserDetail.status ? "Active" : "Inactive"}</p>
            <p>Verified: {selectedUserDetail.is_verified ? "Yes" : "No"}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TableUsers;
