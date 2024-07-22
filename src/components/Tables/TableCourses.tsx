import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row, Space, Table, Input, Select, Spin, Modal } from "antd";
import { useMemo, useState } from "react";
import useCourseData from "../../hooks/course/useCourseData";
import { DataTransfer, Course } from "../../models/Course";
import useDeleteCourse from "../../hooks/course/useDeleteCourse";
import useEditCourse from "../../hooks/course/useEditCourse";
import ModalEditCourse from "../Modal/ModalEditCourse";

const { Option } = Select;
const { Search } = Input;

const TableCourses = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [editingCourse, setEditingCourse] = useState<
    Course["pageData"][number] | null
  >(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const handleDelete = (courseId: string) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa khóa học này?",
      onOk: () => deleteCourse(courseId),
    });
  };

  const handleEdit = (course: Course["pageData"][number]) => {
    setEditingCourse(course);
    setOpenEdit(true);
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
  const { editCourse, loading: editLoading } = useEditCourse(refetchData);

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
      title: "Tên khóa học",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Tên danh mục",
      dataIndex: "category_name",
      key: "category_name",
      width: 400,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(record._id)}
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
            placeholder="Tìm kiếm theo tên khóa học"
            enterButton
            style={{ width: 300 }}
          />
        </Col>
        <Col>
          <Select
            placeholder="Lọc theo trạng thái"
            allowClear
            style={{ width: 200 }}
          >
            <Option value="Active">Hoạt động</Option>
            <Option value="Inactive">Không hoạt động</Option>
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
      {editingCourse && (
        <ModalEditCourse
          open={openEdit}
          setOpen={setOpenEdit}
          course={editingCourse}
          editCourse={editCourse}
          editLoading={editLoading}
        />
      )}
    </div>
  );
};

export default TableCourses;
