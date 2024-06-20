import { Table, TableProps, Button, Tag, Input, Row, Col, Select } from "antd";
import { useState } from "react";

const { Search } = Input;
const { Option } = Select;

interface DataType {
  key: string;
  qA_id: string;
  description: string;
  lesson: string | string[]; //Single String or Array
  deadline: string;
  status: string;
}

const TableQuizAssignment = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      qA_id: "1",
      description: "What is Course?",
      lesson: [
        "Introduction to Course",
        "Getting Started with Python",
        "Get start with .Net",
      ],
      deadline: "2024-01-01",
      status: "Doing",
    },
    {
      key: "2",
      qA_id: "2",
      description:
        "What is the importance of course with the beginner of Python?",
      lesson: [
        "Introduction to Course",
        "Getting Started with Python",
        "Get start with .Net",
      ],
      deadline: "2024-01-01",
      status: "Doing",
    },
    {
      key: "3",
      qA_id: "3",
      description: "How to create API?",
      lesson: [
        "Introduction to Course",
        "Getting Started with Python",
        "Get start with .Net",
      ],
      deadline: "2024-01-01",
      status: "Done",
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
    width: "80px", // Set fixed width for consistency
    height: "32px", // Set fixed height for consistency
    borderRadius: "6px", // Optional: add border radius for rounded corners
  });

  const filteredData = data.filter((item) => {
    const matchesSearchText =
      item.qA_id.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      (Array.isArray(item.lesson)
        ? item.lesson.some((lesson) =>
            lesson.toLowerCase().includes(searchText.toLowerCase())
          )
        : item.lesson.toLowerCase().includes(searchText.toLowerCase()));

    const matchesStatus = !selectedStatus || item.status === selectedStatus;

    return matchesSearchText && matchesStatus;
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Q/A Id",
      dataIndex: "qA_id",
      key: "qA_id",
      width: 100
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Lesson",
      dataIndex: "lesson",
      key: "lesson",
      render: (lesson: string | string[]) =>
        Array.isArray(lesson) ? (
          lesson.map((lesson, index) => (
            <Tag key={index} style={{ marginBottom: 5 }}>
              {lesson}
            </Tag>
          ))
        ) : (
          <Tag style={{ marginBottom: 5 }}>{lesson}</Tag>
        ),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: string, record: DataType) => (
        <Button
          type="default"
          onClick={() => handleStatusChange(record.key)}
          style={getStatusButtonStyle(status)}
        >
          {status.toUpperCase()}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col>
          <Search
            placeholder="Search by Q/A Id, Description or Lesson"
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

export default TableQuizAssignment;
