import { Button, Space, Table, Tag, Input, Select, Row, Col } from "antd";
import { useState } from "react";

const { Option } = Select;
const { Search } = Input;

interface DataType {
    key: string;
    sessionId: string;
    sessionName: string;
    courseName: string | string[];
    status: string;
  }
  

const TableSessions = () => {
  const [data, setData] = useState<DataType[]>([
    {
        key: "1",
        sessionId: "ss123",
        sessionName: "Introduction of course",
        courseName: ["Learn React", "Learn .Net", "Learn Typescript"],
        status: "Active",
      },
      {
        key: "2",
        sessionId: "DEF456",
        sessionName: "Environment, People in IT",
        courseName: "Learn .Net",
        status: "Inactive",
      },
      {
        key: "3",
        sessionId: "GHI789",
        sessionName: "Methods and directions",
        courseName: "Learn Typescript",
        status: "Inactive",
      },
      {
        key: "4",
        sessionId: "KSI789",
        sessionName: "Complete Course",
        courseName: "Learn Typescript",
        status: "Active",
      },
      {
        key: "5",
        sessionId: "KSI789",
        sessionName: "Complete Course",
        courseName: "Learn Typescript",
        status: "Active",
      },
      {
        key: "6",
        sessionId: "KSI789",
        sessionName: "Complete Course",
        courseName: "Learn Typescript",
        status: "Active",
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
      item.sessionName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.courseName.includes(searchText.toLowerCase());
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
        title: "Session Name",
        dataIndex: "sessionName",
        key: "sessionName",
      },
      {
        title: "Course Name",
        dataIndex: "courseName",
        key: "courseName",
        width: 400,
        render: (courseName: string | string[]) =>
          Array.isArray(courseName) ? (
            courseName.map((courseName, index) => (
              <Tag key={index} style={{ marginBottom: 5 }}>
                {courseName}
              </Tag>
            ))
          ) : (
            <Tag style={{ marginBottom: 5 }}>{courseName}</Tag>
          ),
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
            placeholder="Search by Session Name Or Course Name"
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
