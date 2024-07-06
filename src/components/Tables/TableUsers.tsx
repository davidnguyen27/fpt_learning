import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Modal, Tooltip, Input, Select, Tag } from "antd";
import { UserData, UserSearchRequest } from "../../models/Types";
import { deleteUser, getUsers } from "../../services/usersService";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalCreateAcc from "../../components/Modal/ModalCreateAcc";

const { Search } = Input;
const { Option } = Select;

const TableUsers: React.FC = () => {
  // State hooks for managing component state
  const [users, setUsers] = useState<UserData[]>([]); // State to hold list of users
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error state
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State for delete confirmation modal visibility
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null); // State to hold selected user for deletion
  const [searchText, setSearchText] = useState<string>(""); // State to manage search text input
  const [roleFilter, setRoleFilter] = useState<string>("all"); // State to manage role filter
  const [statusFilter, setStatusFilter] = useState<boolean>(true); // State to manage status filter
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to manage modal for creating accounts
  const [pagination, setPagination] = useState({
    // State to manage table pagination
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Effect hook to fetch users when dependencies change
  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, [
    searchText,
    roleFilter,
    statusFilter,
    pagination.current,
    pagination.pageSize,
  ]);

  // Function to fetch users based on search and filters
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
      // Update state with fetched users and pagination information
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
      setLoading(false); // Set loading state to false after fetch completes
    }
  };

  // Function to handle update user action (placeholder for future implementation)
  const handleUpdate = (user: UserData) => {
    console.log("Update user:", user);
  };

  // Function to handle delete user action
  const handleDelete = (user: UserData) => {
    setSelectedUser(user); // Set selected user for delete confirmation
    setIsModalVisible(true); // Show delete confirmation modal
  };

  // Function to confirm user deletion
  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser._id); // Call API to delete user
        setIsModalVisible(false); // Hide delete confirmation modal
        fetchUsers(pagination.current, pagination.pageSize); // Refresh user list
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  // Function to cancel user deletion
  const handleCancelDelete = () => {
    setIsModalVisible(false); // Hide delete confirmation modal
    setSelectedUser(null); // Clear selected user state
  };

  // Function to handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value); // Update search text state
  };

  // Function to handle role filter change
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value); // Update role filter state
  };

  // Function to handle status filter change
  const handleStatusFilterChange = (value: boolean) => {
    setStatusFilter(value); // Update status filter state
  };

  // Function to handle table pagination and sorting changes
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  // Table columns configuration
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
      render: (text: string, record: UserData) => (
        <Link to={`/admin/user-detail/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <Tag color={status ? "green" : "volcano"}>
          {status ? "Active" : "Inactive"}
        </Tag>
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

  // Render loading state if data is loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error fetching users
  if (error) {
    return <div>{error}</div>;
  }

  // Render table with users data and filters
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
          {/* Search input for filtering users */}
          <Search
            placeholder="Search by name or email"
            allowClear
            onSearch={handleSearch}
            onChange={handleSearchChange}
            style={{ width: 300, marginRight: 16 }}
          />
          {/* Role filter dropdown */}
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
          {/* Status filter dropdown */}
          <Select
            style={{ width: 150 }}
            placeholder="Select status"
            onChange={handleStatusFilterChange}
            value={statusFilter}
          >
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
            <Option value={undefined}>All Statuses</Option>
          </Select>
        </div>
        {/* Button to open create account modal */}
        <div>
          <button
            className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
            onClick={() => setIsOpen(true)}
          >
            Create account
          </button>
          {/* Modal for creating account */}
          <ModalCreateAcc isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      {/* Table component displaying users */}
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
      {/* Modal component for confirming user deletion */}
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
    </>
  );
};

export default TableUsers;
