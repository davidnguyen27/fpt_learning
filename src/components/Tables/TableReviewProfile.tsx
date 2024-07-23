import { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Space, Spin, Table } from "antd";
import type { TableProps } from "antd";
import {
  UserData,
  UserSearchRequest,
  UserSearchResponse,
} from "../../models/Types";
import { getUsers, reviewInstructorAPI } from "../../services/usersService";
import ModalReviewInstructor from "../Modal/ModalReviewInstructor";

interface DataType {
  key: string;
  _id: string;
  email: string;
  avatar: string;
  video: string;
  description: string;
  is_verified: boolean;
}

const TableReviewProfile = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<UserData | null>(null);
  const [openReview, setOpenReview] = useState<boolean>(false);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const requestData: UserSearchRequest = {
        searchCondition: {
          keyword: "",
          role: "instructor",
          status: true,
          is_delete: false,
          is_verified: true,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      };

      const response: UserSearchResponse = await getUsers(requestData);
      const instructors: DataType[] = response.data.pageData
        .filter((user) => !user.is_verified)
        .map((user, index) => ({
          key: index.toString(),
          _id: user._id,
          email: user.email,
          avatar: user.avatar,
          video: user.video,
          description: user.description || "",
          is_verified: user.is_verified,
        }));

      setUsers(instructors);
    } catch (error: any) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReview = (userId: string) => {
    const user: any = users.find((user) => user._id === userId);
    if (user) {
      setSelected(user);
      setOpenReview(true);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      setLoading(true);
      await reviewInstructorAPI(userId, "approve", "");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error: any) {
      setError("Failed to approve user");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = (userId: string) => {
    handleOpenReview(userId);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "No",
      key: "index",
      render: (_: any, __: DataType, index: number) => index + 1,
      width: 60,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      render: (video: string) => (
        <a href={video} target="_blank" rel="noopener noreferrer">
          <EyeOutlined /> Watch Video
        </a>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Is Verified",
      dataIndex: "is_verified",
      key: "is_verified",
      render: (is_verified: boolean) => (is_verified ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleApprove(record._id)}>
            Approve
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleReject(record._id)}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Loading">Loading...</Spin>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Table
        className="my-5 rounded-none"
        columns={columns}
        dataSource={users}
      />
      <ModalReviewInstructor
        open={openReview}
        setOpen={setOpenReview}
        selectedUser={selected}
        refreshData={fetchInstructors}
      />
    </>
  );
};

export default TableReviewProfile;
