import React, { useCallback, useMemo, useState, useEffect } from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Table, Spin, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Session } from "../../models/Session";
import { Course } from "../../models/Course";
import useSessionData from "../../hooks/session/useSessionData";
import useCourseData from "../../hooks/course/useCourseData";
import useDeleteSession from "../../hooks/session/useDeleteSession";
import ModalAddSession from "../Modal/ModalAddSession";
import ModalEditSession from "../Modal/ModalEditSession";

const { Search } = Input;

const TableSessions: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [selectedSessionDetail, setSelectedSessionDetail] = useState<Session | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      course_id: "",
      course_name: "",
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

  const sessionDataTransfer = useMemo(
    () => ({
      searchCondition,
      pageInfo,
    }),
    [searchCondition, pageInfo],
  );

  const courseDataTransfer = useMemo(
    () => ({
      searchCondition: {
        keyword: "",
        category_id: "",
        status: "",
        is_delete: false,
      },
      pageInfo,
    }),
    [pageInfo],
  );

  const { data: sessions, loading, error, refetchData } = useSessionData(sessionDataTransfer);
  const { data: fetchedCourses, refetchData: refetchCourses } = useCourseData(courseDataTransfer);
  const { deleteSession } = useDeleteSession(refetchData);

  useEffect(() => {
    refetchCourses(); // Fetch courses when component mounts or pageInfo changes
  }, [refetchCourses]);

  useEffect(() => {
    setCourses(fetchedCourses);
  }, [fetchedCourses]);

  const handleSuccess = useCallback(() => {
    refetchData();
  }, [refetchData]);

  const handleDelete = useCallback(
    (sessionId: string) => {
      Modal.confirm({
        title: "Are you sure you want to delete this session?",
        onOk: () => deleteSession(sessionId),
      });
    },
    [deleteSession]
  );

  const handleEdit = useCallback((sessionId: string) => {
    setEditingSessionId(sessionId);
    setOpenEdit(true);
  }, []);

  const handleNameClick = (session: Session) => {
    const course = courses.find((course) => course._id === session.course_id);
    setSelectedSessionDetail({
      ...session,
      course_name: course ? course.name : "Unknown",
      user_id: course ? course.user_id : "Unknown", // Handle undefined values
    });
    setDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedSessionDetail(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  const columns: ColumnsType<Session> = [
    {
      title: "Session Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string, record: Session) => (
        <a onClick={() => handleNameClick(record)} style={{ cursor: "pointer" }}>
          {name}
        </a>
      ),
    },
    {
      title: "Course Id",
      dataIndex: "course_id",
      key: "course_id",
      width: 100,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Position",
      dataIndex: "position_order",
      key: "position_order",
      width: 80,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <div className="flex space-x-2">
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
          Add Session
        </button>
      </div>
      <Spin spinning={loading}>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={sessions}
            pagination={false}
            scroll={{ x: 'max-content' }} // Ensures table scrolls horizontally if needed
          />
        </div>
      </Spin>
      <ModalAddSession
        open={openAdd}
        setOpen={setOpenAdd}
        onSuccess={handleSuccess}
      />
      <ModalEditSession
        open={openEdit}
        setOpen={setOpenEdit}
        sessionId={editingSessionId}
        onSuccess={handleSuccess}
      />
      <Modal
        title="Session Details"
        visible={detailModalVisible}
        onOk={handleCloseDetailModal}
        onCancel={handleCloseDetailModal}
        footer={null}
      >
        {selectedSessionDetail && (
          <div>
            <p>Name: {selectedSessionDetail.name}</p>
            <p>Course Name: {selectedSessionDetail.course_name}</p>
            <p>User ID: {selectedSessionDetail.user_id}</p>
            <p>Description: {selectedSessionDetail.description}</p>
            <p>Position Order: {selectedSessionDetail.position_order}</p>
            <p>Created At: {new Date(selectedSessionDetail.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(selectedSessionDetail.updated_at).toLocaleString()}</p>
            <p>Deleted: {selectedSessionDetail.is_deleted ? "Yes" : "No"}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TableSessions;
