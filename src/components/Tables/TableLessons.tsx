import React, { useCallback, useMemo, useState } from "react";
import { DeleteOutlined, FormOutlined, } from "@ant-design/icons";
import { Table, Spin, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Lesson, DataTransfer } from "../../models/Lesson";
import useLessonData from "../../hooks/lesson/useLessonData";
import useDeleteLesson from "../../hooks/lesson/useDeleteLesson";
import ModalAddLesson from "../Modal/ModalAddLesson";
import ModalEditLesson from "../Modal/ModalEditLesson";

const { Search } = Input;

const TableLessons: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [selectedLessonDetail, setSelectedLessonDetail] = useState<Lesson | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

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

  const { data, loading, refetchData } = useLessonData(dataTransfer);
  const { deleteLesson } = useDeleteLesson(refetchData);

  const handleSuccess = useCallback(() => {
    refetchData();
  }, [refetchData]);

  const handleDelete = useCallback(
    (lessonId: string) => {
      Modal.confirm({
        title: "Are you sure you want to delete this lesson?",
        onOk: () => deleteLesson(lessonId),
      });
    },
    [deleteLesson]
  );

  const handleEdit = useCallback((lessonId: string) => {
    setEditingLessonId(lessonId);
    setOpenEdit(true);
  }, []);

  const handleNameClick = (lesson: Lesson) => {
    setSelectedLessonDetail(lesson);
    setDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedLessonDetail(null);
  };

  
  
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
  };

  const columns: ColumnsType<Lesson> = [
    {
      title: "Lesson Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Lesson) => (
        <a onClick={() => handleNameClick(record)} style={{ cursor: "pointer" }}>
          {name}
        </a>
      )
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
      width: 150,
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
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <FormOutlined
            onClick={() => handleEdit(record._id)}
            className="cursor-pointer text-blue-500"
          />
          <DeleteOutlined
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(record._id)}
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
          Add Lesson
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
      <Modal
        title="Lesson Details"
        visible={detailModalVisible}
        onOk={handleCloseDetailModal}
        onCancel={handleCloseDetailModal}
        footer={null}
      >
        {selectedLessonDetail && (
          <div className="flex">
            <div>
              <p>Name: {selectedLessonDetail.name}</p>
              <p>Course Name: {selectedLessonDetail.course_name}</p>
              <p>Session Name: {selectedLessonDetail.session_name}</p>
              <p>Created At: {new Date(selectedLessonDetail.created_at).toLocaleString()}</p>
              <p>Updated At: {new Date(selectedLessonDetail.updated_at).toLocaleString()}</p>
              <p>Lesson Type: {selectedLessonDetail.lesson_type}</p>
              <p>Duration: {selectedLessonDetail.full_time}</p>
            </div>
            <div className="ml-4">
            {selectedLessonDetail.description && (
                <div className="mb-2">
                  <a href={selectedLessonDetail.description} target="_blank" rel="noopener noreferrer">
                    Description
                  </a>
                </div>
              )}
              {selectedLessonDetail.video_url && (
                <div className="mb-2">
                  <a href={selectedLessonDetail.video_url} target="_blank" rel="noopener noreferrer">
                    Video URL
                  </a>
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(selectedLessonDetail.video_url)}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full mt-2"
                  ></iframe>
                </div>
              )}
              {selectedLessonDetail.image_url && (
                <div>
                  <a href={selectedLessonDetail.image_url} target="_blank" rel="noopener noreferrer">
                    Image URL
                  </a>
                  <img src={selectedLessonDetail.image_url} alt="Course" className="w-full mt-2" />
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
      
    </>
  );
};

export default TableLessons;
