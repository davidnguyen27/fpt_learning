import { Button, Space, Table, Tag, Input, Select, Row, Col } from "antd";
import { useState } from "react";

const { Option } = Select;
const { Search } = Input;

interface DataType {
  key: string;
  lesson_id: string;
  lessonTitle: string;
  course: string | string[];
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
      lessonTitle: "Introduction to Course",
      course: ["Course 1", "Course 2", "Course 3"],
      duration: "10 mins",
      createdAt: "2024-01-01",
      status: "Doing",
      preview: true,
      quizAssignment: false,
    },
    {
      key: "2",
      lesson_id: "2",
      lessonTitle: "Getting Started with Python",
      course: "Course 2",
      duration: "20 mins",
      createdAt: "2024-01-02",
      status: "Done",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "3",
      lesson_id: "3",
      lessonTitle: "Get start with .Net",
      course: "Course 3",
      duration: "20 mins",
      createdAt: "2024-01-02",
      status: "Doing",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "4",
      lesson_id: "4",
      lessonTitle: "Getting Started with Python",
      course: "Course 1",
      duration: "20 mins",
      createdAt: "2024-01-02",
      status: "Done",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "5",
      lesson_id: "5",
      lessonTitle: "Getting Started with Python",
      course: "Course 1",
      duration: "20 mins",
      createdAt: "2024-01-02",
      status: "Doing",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "6",
      lesson_id: "6",
      lessonTitle: "Advanced Python",
      course: "Course 3",
      duration: "30 mins",
      createdAt: "2024-01-03",
      status: "Doing",
      preview: false,
      quizAssignment: true,
    },
    {
      key: "7",
      lesson_id: "7",
      lessonTitle: "Machine Learning Basics",
      course: "Course 2",
      duration: "40 mins",
      createdAt: "2024-01-04",
      status: "Done",
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
        item.status = item.status === "Doing" ? "Done" : "Doing";
      }
      return item;
    });
    setData(updatedData);
  };

  const getStatusButtonStyle = (status: string) => ({
    backgroundColor: status === "Doing" ? "#16a34a" : "gray",
    color: "white",
    border: "none",
    width: "80px",
    height: "32px",
    borderRadius: "6px",
  });

  const filteredData = data.filter((item) => {
    const matchesSearchText =
      item.lesson_id.toLowerCase().includes(searchText.toLowerCase()) ||
      item.lessonTitle.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !selectedStatus || item.status === selectedStatus;

    return matchesSearchText && matchesStatus;
  });

  const columns = [
    {
      title: "Lesson Id",
      dataIndex: "lesson_id",
      key: "lesson_id",
      width: 200,
    },
    {
      title: "Lesson Title",
      dataIndex: "lessonTitle",
      key: "lessonTitle",
      width: 400,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      width: 400,
      render: (courses: string | string[]) =>
        Array.isArray(courses) ? (
          courses.map((course, index) => (
            <Tag key={index} style={{ marginBottom: 5 }}>
              {course}
            </Tag>
          ))
        ) : (
          <Tag style={{ marginBottom: 5 }}>{courses}</Tag>
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
      render: (_: any) => (
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
            placeholder="Search by Lesson Id or Title"
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
            <Option value="Doing">Doing</Option>
            <Option value="Done">Done</Option>
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
