import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Table, Spin, Modal } from "antd";
import { DataTransfer } from "../../models/Lesson";
import useLessonsData from "../../hooks/lesson/useLessonData";
import Search from "antd/es/input/Search";
import { useState, useMemo } from "react";
import ModalAddLesson from "../Modal/ModalAddLesson";
import useDeleteLesson from "../../hooks/lesson/useDeleteLesson";
import ModalEditLesson from "../Modal/ModalEditLesson";
import type { ColumnsType } from "antd/es/table";

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
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
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

  const { data, loading, error, refetchData } = useLessonsData(dataTransfer);
  const { deleteLesson } = useDeleteLesson(refetchData);

  if (error) {
    return <div>{error}</div>;
  }

  const columns: ColumnsType<DataType> = [
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
      width: 200,
      render: (_, record) => (
        <>
          <FormOutlined
            onClick={() => handleEdit(record.key)}
            className="mx-6 cursor-pointer text-blue-500"
          />
          <DeleteOutlined
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(record.key)}
          />
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
          style={{ width: 300 }}
        />
        <button
          onClick={() => setOpenAdd(true)}
          className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Add Lesson
        </button>
      </div>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={data} />
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
