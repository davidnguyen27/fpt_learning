import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Col, Row, Space, Table, Input, Select, Spin, Modal } from "antd";
import { useMemo, useState } from "react";
import useCourseData from "../../hooks/course/useCourseData";
import { DataTransfer } from "../../models/Course";
import useDeleteCourse from "../../hooks/course/useDeleteCourse";
const { Option } = Select;
const { Search } = Input;

const TableCourses = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const handleDelete = (courseId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this lesson?",
      onOk: () => deleteCourse(courseId),
    });
  };

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      category_id: "",
      status: "",
      is_deleted: false,
    }),
    [searchKeyword],
  );

  const pageInfo = useMemo(
    () => ({
      pageNum: 1,
      pageSize: 10,
    }),
    [],
  );

  const dataTransfer: DataTransfer = useMemo(
    () => ({
      searchCondition,
      pageInfo,
    }),
    [searchCondition, pageInfo],
  );

  const { data, loading, error, refetchData } = useCourseData(dataTransfer);
  const { deleteCourse } = useDeleteCourse(refetchData);

  if (error) {
    return <div>{error}</div>;
  }

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
      width: 400,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <FormOutlined />
          <DeleteOutlined
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(record.key)}
          />
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
            onSearch={handleSearch}
            placeholder="Search by Course Name"
            enterButton
            style={{ width: 300 }}
          />
        </Col>
        <Col>
          <Select
            placeholder="Filter by Status"
            allowClear
            style={{ width: 200 }}
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Table
          className="my-5 rounded-none"
          dataSource={data}
          columns={columns}
        />
      </Spin>
    </div>
  );
};

export default TableCourses;
