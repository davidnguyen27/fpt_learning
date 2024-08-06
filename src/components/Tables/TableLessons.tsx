import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Table, Spin, Modal, Input, Pagination, Tooltip, Button } from "antd";
import { useState, useMemo } from "react";
import ModalAddLesson from "../Modal/ModalAddLesson";
import useDeleteLesson from "../../hooks/lesson/useDeleteLesson";
import ModalEditLesson from "../Modal/ModalEditLesson";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import {
  setPageNum,
  setPageSize,
} from "../../app/redux/pagination/paginationSlice";
import useLessonsData from "../../hooks/lesson/useLessonData";

const { Search } = Input;

interface DataType {
  key: string;
  name: string;
  course_name: string;
  session_name: string;
  lesson_type: string;
  full_time: number;
  position_order: number;
}

const TableLessons = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize } = useSelector(
    (state: RootState) => state.pagination,
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const handlePageChange = (page: number, newPageSize: number) => {
    dispatch(setPageNum(page));
    dispatch(setPageSize(newPageSize));
  };

  const handleSuccess = () => {
    refetchData();
  };

  const handleDelete = (lessonId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this lesson?",
      onOk: () => deleteLesson(lessonId),
    });
  };

  const handleEdit = (lessonId: string) => {
    setEditingLessonId(lessonId);
    setOpenEdit(true);
  };

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      course_id: "",
      session_id: "",
      lesson_type: "",
      is_position_order: true,
      is_delete: false,
    }),
    [searchKeyword],
  );

  const pageInfo = useMemo(
    () => ({
      pageNum,
      pageSize,
    }),
    [pageNum, pageSize],
  );

  const dataTransfer = useMemo(
    () => ({
      searchCondition,
      pageInfo,
    }),
    [searchCondition, pageInfo],
  );

  const { data, totalItems, loading, error, refetchData } = useLessonsData(dataTransfer);
  const { deleteLesson } = useDeleteLesson(refetchData);

  if (error) {
    return <div>{error}</div>;
  }

  // Add index to dataSource
  const dataWithIndex = data?.map((item, index) => ({
    ...item,
    index: (pageNum - 1) * pageSize + index + 1,
  }));

  const columns: ColumnsType<DataType & { index: number }> = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 50,
    },
    {
      title: "Lesson Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Session Name",
      dataIndex: "session_name",
      key: "session_name",
    },
    {
      title: "Lesson Type",
      dataIndex: "lesson_type",
      key: "lesson_type",
      width: 100,
    },
    {
      title: "Duration",
      dataIndex: "full_time",
      key: "full_time",
      width: 100,
    },
    {
      title: "Position Order",
      dataIndex: "position_order",
      key: "position_order",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      width: 110,
      render: (_, record) => (
        <>
          <Tooltip title="Edit Lesson">
            <FormOutlined
              onClick={() => handleEdit(record.key)}
              className="cursor-pointer text-blue-500"
            />
          </Tooltip>
          <Tooltip title="Delete Lesson">
            <DeleteOutlined
              className="ml-3 cursor-pointer text-red-500"
              onClick={() => handleDelete(record.key)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="my-3 flex items-center justify-between">
        <Search
          onSearch={handleSearch}
          placeholder="Search by keyword"
          allowClear
          style={{ width: 256 }}
        />

        <Button
          type="primary"
          danger
          onClick={() => setOpenAdd(true)}
          className="px-5 py-2"
        >
          Add Lesson
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={dataWithIndex}
          pagination={false}
        />
        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={totalItems}  // Sử dụng totalItems từ API
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: "right", justifyContent: "end" }}
          showSizeChanger
        />
      </Spin>
      <ModalAddLesson
        open={openAdd}
        setOpen={setOpenAdd}
        onSuccess={handleSuccess}
      />
      <ModalEditLesson
        open={openEdit}
        setOpen={setOpenEdit}
        lessonId={editingLessonId}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default TableLessons;
