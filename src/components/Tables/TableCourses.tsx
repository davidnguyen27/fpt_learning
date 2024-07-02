import { Button, Col, Row, Space, Table, Input, Select, Tag } from "antd";
import { useState } from "react";
const { Option } = Select;
const { Search } = Input;

interface DataType {
  key: string;
  courseId: string;
  courseName: string;
  categoryName: string | string[];
  createdAt: string;
  status: string;
}

const TableCourses = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      courseId: "1",
      courseName: "Introduction to Course",
      categoryName: ["Category 1", "Category 2", "Category 3"],
      createdAt: "12/06/2024",
      status: "Active",
    },
    {
      key: "2",
      courseId: "2",
      courseName: "Getting Started with Python",
      categoryName: "Course 2",
      createdAt: "13/06/2024",
      status: "Inactive",
    },
    {
      key: "3",
      courseId: "3",
      courseName: "Getting Started with Python",
      categoryName: "Course 2",
      createdAt: "13/06/2024",
      status: "Inactive",
    },
    {
      key: "4",
      courseId: "4",
      courseName: "Getting Started with Python",
      categoryName: "Course 2",
      createdAt: "13/06/2024",
      status: "Inactive",
    },
    {
      key: "5",
      courseId: "5",
      courseName: "Getting Started with Python",
      categoryName: "Course 2",
      createdAt: "13/06/2024",
      status: "Inactive",
    },
    {
      key: "6",
      courseId: "6",
      courseName: "Getting Started with Python",
      categoryName: "Course 2",
      createdAt: "13/06/2024",
      status: "Inactive",
    },
    {
      key: "7",
      courseId: "7",
      courseName: "Getting Started with Python",
      categoryName: "Course 2",
      createdAt: "13/06/2024",
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
      item.courseName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.categoryName.includes(searchText.toLowerCase());
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
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      width: 400,
      render: (categoryName: string | string[]) =>
        Array.isArray(categoryName) ? (
          categoryName.map((categoryName, index) => (
            <Tag key={index} style={{ marginBottom: 5 }}>
              {categoryName}
            </Tag>
          ))
        ) : (
          <Tag style={{ marginBottom: 5 }}>{categoryName}</Tag>
        ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
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
            placeholder="Search by Course Name or Category Name"
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

export default TableCourses;
