import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Table, Spin, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTransfer } from "../../models/Course";
import useCourseData from "../../hooks/course/useCourseData";
import { useState, useMemo, useCallback } from "react";
import ModalAddCourse from "../Modal/ModalAddCourse";
import useDeleteCourse from "../../hooks/course/useDeleteCourse";
import ModalEditCourse from "../Modal/ModalEditCourse";
import Search from "antd/es/input/Search";

interface DataType {
  key: string;
  name: string;
  description: string;
  category_id: string;
  user_id: string;
  video_url: string | null;
  image_url: string | null;
  status: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
}

const TableCourses = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      category_id: "",
      status: "",
      is_delete: false,
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

  const handleSuccess = useCallback(() => {
    refetchData();
  }, [refetchData]);

  const handleDelete = useCallback(
    (courseId: string) => {
      Modal.confirm({
        title: "Are you sure you want to delete this course?",
        onOk: () => deleteCourse(courseId),
      });
    },
    [deleteCourse]
  );

  const handleEdit = useCallback((courseId: string) => {
    setEditingCourseId(courseId);
    setOpenEdit(true);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
      width: 100,
    },
    {
      title: "User",
      dataIndex: "user_id",
      key: "user_id",
      width: 100,
    },
    {
      title: "Video",
      dataIndex: "video_url",
      key: "video_url",
      width: 100,
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 80,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 80,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <div className="flex space-x-2">
          <FormOutlined
            onClick={() => handleEdit(record.key)}
            className="cursor-pointer text-blue-500"
          />
          <DeleteOutlined
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="my-3 flex flex-wrap items-center justify-between gap-2">
        <Search
          onSearch={handleSearch}
          placeholder="Search by keyword"
          allowClear
          className="w-full md:w-1/3"
        />
        <button
          onClick={() => setOpenAdd(true)}
          className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Add Course
        </button>
      </div>
      <Spin spinning={loading}>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: 'max-content' }} // Ensures table scrolls horizontally if needed
          />
        </div>
      </Spin>
      <ModalAddCourse
        open={openAdd}
        setOpen={setOpenAdd}
        onSuccess={handleSuccess}
      />
      <ModalEditCourse
        open={openEdit}
        setOpen={setOpenEdit}
        courseId={editingCourseId}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default TableCourses;
