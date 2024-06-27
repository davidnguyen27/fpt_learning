import { Button, Space, Table, Tag, Input, Select, Row, Col } from "antd";
import { useState } from "react";

const { Option } = Select;
const { Search } = Input;

interface DataType {
  key: string;
  lesson_id: string;
  lessonTitle: string;
  sessionName: string | string[];
  duration: string;
  createdAt: string;
  status: string;
  preview: boolean;
  quizAssignment: boolean;
}

const TableLessons = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      lesson_id: "1",
      lessonTitle: "Design UI with Figma",
      sessionName: ["Introduction of course", "Environment, People in IT", "Methods and directions", "Complete Course"],
      duration: "10 mins",
      createdAt: "2024-01-01",
      status: "Active",
      preview: true,
      quizAssignment: false,
    },
    {
      key: "2",
      lesson_id: "2",
      lessonTitle: "Getting Started with Python",
      sessionName: "Introduction of course",
      duration: "20 mins",
      createdAt: "2024-01-02",
      status: "Inactive",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "3",
      lesson_id: "3",
      lessonTitle: "Get start with .Net",
      sessionName: "Introduction of course",
      duration: "20 mins",
      createdAt: "2024-01-02",
      status: "Active",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "4",
      lesson_id: "4",
      lessonTitle: "Getting Started with Python",
      sessionName: "Introduction of course",
      duration: "20 mins",
      createdAt: "2024-01-02",
      status: "Inactive",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "5",
      lesson_id: "5",
      lessonTitle: "Getting Started with Python",
      sessionName: "Introduction of course",
      duration: "20 mins",
      createdAt: "2024-01-02",
      status: "Active",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "6",
      lesson_id: "6",
      lessonTitle: "Advanced Python",
      sessionName: "Introduction of course",
      duration: "30 mins",
      createdAt: "2024-01-03",
      status: "Active",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "7",
      lesson_id: "7",
      lessonTitle: "Machine Learning Basics",
      sessionName: "Introduction of course",
      duration: "40 mins",
      createdAt: "2024-01-04",
      status: "Inactive",
      preview: true,
      quizAssignment: false,
    },
  ]);

  const [searchText, setSearchText] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusChange = (key: string) => {
    const updatedData = data.map((item) => {
      if (item.key === key) {
        item.status = item.status === "Active" ? "Inactive" : "Active";
      }
      return item;
    });
    setData(updatedData);
  };

  const getStatusButtonStyle = (status: string) => ({
    backgroundColor: status === "Active" ? "#16a34a" : "gray",
    color: "white",
    border: "none",
    width: "80px",
    height: "32px",
    borderRadius: "6px",
  });

  const filteredData = data.filter((item) => {
    const matchesSearchText =
      item.sessionName.includes(searchText.toLowerCase()) ||
      item.lessonTitle.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !selectedStatus || item.status === selectedStatus;

    return matchesSearchText && matchesStatus;
  });

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: "Lesson Title",
      dataIndex: "lessonTitle",
      key: "lessonTitle",
      width: 400,
    },
    {
      title: "Session Name",
      dataIndex: "sessionName",
      key: "sessionName",
      width: 400,
      render: (sessionName: string | string[]) =>
        Array.isArray(sessionName) ? (
          sessionName.map((sessionName, index) => (
            <Tag key={index} style={{ marginBottom: 5 }}>
              {sessionName}
            </Tag>
          ))
        ) : (
          <Tag style={{ marginBottom: 5 }}>{sessionName}</Tag>
        ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 100,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 250,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: DataType) => (
        <Button
          type="default"
          onClick={() => handleStatusChange(record.key)}
          style={getStatusButtonStyle(status)}
        >
          {status.toUpperCase()}
        </Button>
      ),
      width: 150,
    },
    {
      title: "Preview",
      dataIndex: "preview",
      key: "preview",
      render: (preview: boolean) => (preview ? "Yes" : "No"),
      width: 100,
    },
    {
      title: "Quiz/Assignment",
      dataIndex: "quizAssignment",
      key: "quizAssignment",
      render: (hasQuizAssignment: boolean) =>
        hasQuizAssignment ? "Yes" : "No",
      width: 150,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: DataType) => (
        <Space size="middle">
          <Button type="link" style={{ fontSize: "14px", padding: "0px 8px" }}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            style={{ fontSize: "14px", padding: "0px 8px" }}
          >
            Delete
          </Button>
          <Button type="link" style={{ fontSize: "14px", padding: "0px 8px" }}>
            View
          </Button>
        </Space>
      ),
      width: 100,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col>
          <Search
            placeholder="Search by Lesson Title or Session Name"
            onChange={handleSearchChange}
            onSearch={handleSearch}
            enterButton
            style={{ width: 300 }}
          />
        </Col>
        <Col>
          <Select
            placeholder="Filter by Status"
            onChange={(value) => setSelectedStatus(value)}
            allowClear
            style={{ width: 200 }}
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Col>
      </Row>
      <Table
        className="my-5 rounded-none"
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TableLessons;
