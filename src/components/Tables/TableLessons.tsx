import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Table, Spin, message, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTransfer } from "../../models/Lesson";
import useLessonsData from "../../hooks/lesson/useLessonData";
import Search from "antd/es/input/Search";
import { useState, useMemo } from "react";
import ModalAddLesson from "../Modal/ModalAddLesson";
import useDeleteLesson from "../../hooks/lesson/useDeleteLesson";
import ModalEditLesson from "../Modal/ModalEditLesson";

interface DataType {
  key: string;
  session_id: string;
  session_name: string;
  course_name: string;
  position_order: number;
  name: string;
  video_url: string;
  full_time: number;
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
    message.success("Lesson added successfully");
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
      title: "Session",
      dataIndex: "session_name",
      key: "session_name",
      onCell: (record, rowIndex) => {
        if (
          rowIndex === undefined ||
          rowIndex === 0 ||
          record.session_id !== data[rowIndex - 1]?.session_id
        ) {
          let rowSpan = 1;
          for (let i = (rowIndex ?? 0) + 1; i < data.length; i++) {
            if (data[i].session_id !== record.session_id) break;
            rowSpan++;
          }
          return { rowSpan };
        } else {
          return { rowSpan: 0 };
        }
      },
    },
    {
      title: "Course",
      dataIndex: "course_name",
      key: "course_name",
      width: 300,
      onCell: (record, rowIndex) => {
        if (
          rowIndex === undefined ||
          rowIndex === 0 ||
          record.course_name !== data[rowIndex - 1]?.course_name
        ) {
          let rowSpan = 1;
          for (let i = (rowIndex ?? 0) + 1; i < data.length; i++) {
            if (data[i].course_name !== record.course_name) break;
            rowSpan++;
          }
          return { rowSpan };
        } else {
          return { rowSpan: 0 };
        }
      },
    },
    {
      title: "Lesson Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Order",
      dataIndex: "position_order",
      key: "position_order",
      width: 100,
    },
    {
      title: "Video (url)",
      dataIndex: "video_url",
      key: "video_url",
      width: 300,
    },
    {
      title: "Duration",
      dataIndex: "full_time",
      key: "full_time",
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
