import { Button, message, Space, Spin, Table, Modal, Input, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  getCoursesAPI,
  toggleCourseStatus,
} from "../../services/coursesService";
import { formatDate } from "../../utils/formatDate";

interface DataType {
  key: string;
  _id: string;
  name: string;
  category_name: string;
  status: string;
  created_at: string;
}

const TableCheck = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const loadCourses = async () => {
    setLoading(true);
    try {
      const courses = await getCoursesAPI({
        searchCondition: {
          keyword: searchText,
          category_id: "",
          status: "waiting_approve",
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });
      setData(courses.map((course: any) => ({ ...course, key: course._id })));
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, [searchText]); // Depend on searchText to reload courses on search change

  const handleStatusChange = async (
    course_id: string | null,
    new_status: string,
    comment: string = "",
  ) => {
    if (!course_id) {
      message.error("Course ID is undefined.");
      return;
    }

    try {
      await toggleCourseStatus(course_id, new_status, comment);
      message.success(
        `Course ${new_status === "approve" ? "approved" : "rejected"} successfully`,
      );
      loadCourses();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to update course status");
      }
    }
  };

  const handleApprove = (_id: string) => {
    handleStatusChange(_id, "approve");
  };

  const handleReject = (_id: string) => {
    setSelectedCourseId(_id);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (selectedCourseId) {
      await handleStatusChange(selectedCourseId, "reject", comment);
    }
    setIsModalVisible(false);
    setComment("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setComment("");
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "waiting_approve" ? "yellow" : "blue"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleApprove(record._id)}>
            Approve
          </Button>
          <Button danger onClick={() => handleReject(record._id)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search by course name or category"
          allowClear
          onSearch={handleSearch}
          style={{ width: 254 }}
        />
      </div>
      <Spin spinning={loading}>
        <Table
          className="my-5 rounded-none"
          columns={columns}
          dataSource={data}
        />
      </Spin>
      <Modal
        title="Reject Course"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter rejection reason"
        />
      </Modal>
    </>
  );
};

export default TableCheck;
