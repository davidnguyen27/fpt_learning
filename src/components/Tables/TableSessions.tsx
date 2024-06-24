import { Button, Space, Table, Tag, Input, Select, Row, Col } from "antd";
import { useState } from "react";

const { Option } = Select;
const { Search } = Input;

interface DataType {
    key: string;
    instructorId: string;
    sessionId: string;
    course: string;
    startTime: string;
    lastActivityTime: string;
    location: string;
    status: string;
  }
  

const TableSessions = () => {
  const [data, setData] = useState<DataType[]>([
    {
        key: "1",
        instructorId: "instructor123",
        sessionId: "ABC123",
        course: "Learn React",
        startTime: "2024-06-24 10:15 AM",
        lastActivityTime: "2024-06-24 10:45 AM",
        location: "New York, USA",
        status: "Active",
      },
      {
        key: "2",
        instructorId: "instructor456",
        sessionId: "DEF456",
        course: "Learn .Net",
        startTime: "2024-06-24 09:30 AM",
        lastActivityTime: "2024-06-24 10:40 AM",
        location: "London, UK",
        status: "Idle",
      },
      {
        key: "3",
        instructorId: "instructor789",
        sessionId: "GHI789",
        course: "Learn Typescript",
        startTime: "2024-06-24 08:50 AM",
        lastActivityTime: "2024-06-24 10:20 AM",
        location: "Tokyo, Japan",
        status: "Active",
      },
      {
        key: "4",
        instructorId: "instructor101",
        sessionId: "JKL101",
        course: "Learn Java",
        startTime: "2024-06-24 10:00 AM",
        lastActivityTime: "2024-06-24 10:30 AM",
        location: "Berlin, Germany",
        status: "Inactive",
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
      item.sessionId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.instructorId.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !selectedStatus || item.status === selectedStatus;

    return matchesSearchText && matchesStatus;
  });

  const columns = [
    {
        title: "Instructor ID",
        dataIndex: "instructorId",
        key: "instructorId",
        width: 150,
      },
      {
        title: "Course",
        dataIndex: "course",
        key: "course",
      },
      {
        title: "Session ID",
        dataIndex: "sessionId",
        key: "sessionId",
        width: 120,
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
        width: 200,
      },
      {
        title: "Last Activity Time",
        dataIndex: "lastActivityTime",
        key: "lastActivityTime",
        width: 200,
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        width: 150,
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

export default TableSessions;
