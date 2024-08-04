import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Tooltip,
  Input,
  Select,
  Tag,
  Switch,
  Spin,
  Button,
  message,
} from "antd";
import { UserData, UserSearchRequest } from "../../models/Types";
import {
  deleteUser,
  getUsers,
  toggleUserStatus,
  updateUser,
  changeRoleAPI,
} from "../../services/usersService";
import {
  DeleteOutlined,
  EditOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import ModalCreateAcc from "../../components/Modal/ModalCreateAcc";
import ModalChangeRole from "../Modal/ModalChangeRole";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import {
  setPageNum,
  setPageSize,
  setTotalItems,
  setTotalPages,
} from "../../app/redux/pagination/paginationSlice";

const { Search } = Input;
const { Option } = Select;

const TableUsers: React.FC = () => {
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootState) => state.pagination);

  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [statusModalVisible, setStatusModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [chosenUser, setChosenUser] = useState<UserData | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openChange, setOpenChange] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserData | null>(
    null,
  );
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [verificationFilter, setVerificationFilter] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers(pagination.pageNum, pagination.pageSize);
  }, [
    searchText,
    roleFilter,
    statusFilter,
    verificationFilter,
    pagination.pageNum,
    pagination.pageSize,
  ]);

  const fetchUsers = async (page: number = 1, pageSize: number = 10) => {
    setLoading(true);
    const requestData: UserSearchRequest = {
      searchCondition: {
        keyword: searchText.trim(),
        role: roleFilter,
        status: statusFilter,
        is_verified: verificationFilter,
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
      dispatch(setTotalItems(response.data.pageInfo.totalItems));
      dispatch(setTotalPages(response.data.pageInfo.totalPages));
      dispatch(setPageNum(response.data.pageInfo.pageNum));
      dispatch(setPageSize(response.data.pageInfo.pageSize));
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

  const handleVerificationFilterChange = (value: boolean) => {
    setVerificationFilter(value);
  };

  const handleUpdateConfirm = async (updatedUserData: Partial<UserData>) => {
    if (editedUser) {
      try {
        const updatedUser = await updateUser(editedUser._id, updatedUserData);
        setEditedUser(null);
        setIsEditModalVisible(false);
        fetchUsers(pagination.pageNum, pagination.pageSize);
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
  };

  const handleDelete = (user: UserData) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser._id);
        setIsModalVisible(false);
        fetchUsers(pagination.pageNum, pagination.pageSize);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };

  const handleStatusFilterChange = (value: boolean) => {
    setStatusFilter(value);
  };

  const handleTableChange = (pagination: any) => {
    dispatch(setPageNum(pagination.current));
    dispatch(setPageSize(pagination.pageSize));
    fetchUsers(pagination.current, pagination.pageSize);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedUserDetail(null);
  };

  const handleStatusChange = (user: UserData, newStatus: boolean) => {
    if (newStatus !== user.status) {
      setChosenUser(user);
      setStatusModalVisible(true);
    } else {
      console.log("Status remains unchanged");
    }
  };

  const handleConfirmStatusChange = async () => {
    if (chosenUser) {
      try {
        await toggleUserStatus(chosenUser._id, !chosenUser.status);
        fetchUsers(pagination.pageNum, pagination.pageSize);
      } catch (error) {
        console.error("Failed to update status:", error);
      } finally {
        setStatusModalVisible(false);
        setChosenUser(null);
      }
    }
  };

  const handleCancelStatusChange = () => {
    setStatusModalVisible(false);
    setSelectedUser(null);
  };

  const handleOpenChangeRoleModal = (user: UserData) => {
    setCurrentUser(user);
    setOpenChange(true);
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await changeRoleAPI(userId, role);
      fetchUsers(pagination.pageNum, pagination.pageSize);
      message.success("Role updated successfully");
    } catch (error: any) {
      message.error(`Failed to update role: ${error.message}`);
    }
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_: any, __: any, index: number) => {
        return (pagination.pageNum - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: UserData) => (
        <a
          onClick={() => handleNameClick(record)}
          style={{ cursor: "pointer" }}
        >
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
        <Switch
          checked={status}
          checkedChildren={<UserDeleteOutlined />}
          unCheckedChildren={<UserAddOutlined />}
          onChange={(checked) => handleStatusChange(record, checked)}
        />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, record: UserData) => (
        <Select
          defaultValue={role}
          style={{ width: 120 }}
          onChange={(value) => handleRoleChange(record._id, value)}
        >
          <Option value="admin">Admin</Option>
          <Option value="instructor">Instructor</Option>
          <Option value="student">Student</Option>
        </Select>
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
          <Tooltip title="Role">
            <RetweetOutlined
              onClick={() => handleOpenChangeRoleModal(record)}
              style={{
                fontSize: "16px",
                color: "green",
                marginRight: 16,
                cursor: "pointer",
              }}
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
            style={{ width: 254, marginRight: 16 }}
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
            style={{ width: 150, marginRight: 16 }}
            placeholder="Select status"
            onChange={handleStatusFilterChange}
            value={statusFilter}
          >
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
          <Select
            style={{ width: 150 }}
            placeholder="Verify status"
            onChange={handleVerificationFilterChange}
            value={verificationFilter}
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </div>
        <div>
          <Button
            type="primary"
            danger
            className="px-5 py-2"
            onClick={() => setIsOpen(true)}
          >
            Create account
          </Button>
          <ModalCreateAcc
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            fetchUser={fetchUsers}
          />
        </div>
      </div>
      {loading ? (
        <Spin
          className="mb-12 mt-12 flex items-center justify-center"
          spinning={loading}
        />
      ) : (
        <Table
          className="my-5 rounded-none"
          columns={columns}
          dataSource={users}
          rowKey={(record) => record._id}
          pagination={{
            current: pagination.pageNum,
            pageSize: pagination.pageSize,
            total: pagination.totalItems,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
        />
      )}
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
            <p>Description:</p>
            <Input
              value={editedUser.description}
              onChange={(e) =>
                setEditedUser({ ...editedUser, description: e.target.value })
              }
              placeholder="Description"
              style={{ marginBottom: 16 }}
            />
            <p>Phone:</p>
            <Input
              value={editedUser.phone_number}
              onChange={(e) =>
                setEditedUser({ ...editedUser, phone_number: e.target.value })
              }
              placeholder="Phone"
              style={{ marginBottom: 16 }}
            />
          </div>
        )}
      </Modal>
      <Modal
        title={`Confirm ${chosenUser?.status ? "Shut Down" : "Turn On"} User`}
        visible={statusModalVisible}
        onOk={handleConfirmStatusChange}
        onCancel={handleCancelStatusChange}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to{" "}
          {chosenUser?.status ? "shut down" : "turn on"} this user?
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
      {currentUser && (
        <ModalChangeRole
          open={openChange}
          setOpen={setOpenChange}
          userId={currentUser._id}
          currentRole={currentUser.role}
        />
      )}
    </>
  );
};

export default TableUsers;
