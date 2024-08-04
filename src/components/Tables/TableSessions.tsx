import React, { useCallback, useMemo, useState, useEffect } from "react";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Table, Spin, Modal, Input, Select, Pagination, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Session } from "../../models/Session";
import { Course } from "../../models/Course";
import useSessionData from "../../hooks/session/useSessionData";
import useCourseData from "../../hooks/course/useCourseData";
import useDeleteSession from "../../hooks/session/useDeleteSession";
import ModalAddSession from "../Modal/ModalAddSession";
import ModalEditSession from "../Modal/ModalEditSession";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import {
  setPageNum,
  setPageSize,
} from "../../app/redux/pagination/paginationSlice";

const { Search } = Input;
const { Option } = Select;

const TableSessions: React.FC = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize } = useSelector(
    (state: RootState) => state.pagination,
  );

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [selectedSessionDetail, setSelectedSessionDetail] =
    useState<Session | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  const handleCourseChange = useCallback((value: string) => {
    setSelectedCourse(value);
  }, []);

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      course_id: selectedCourse,
      course_name: "",
      is_position_order: true,
      is_delete: false,
    }),
    [searchKeyword, selectedCourse],
  );

  const pageInfo = useMemo(
    () => ({
      pageNum,
      pageSize,
    }),
    [pageNum, pageSize],
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

  const {
    data: sessions,
    loading,
    error,
    pageInfo: paginationInfo,
    refetchData,
  } = useSessionData(sessionDataTransfer);
  const { data: fetchedCourses, refetchData: refetchCourses } =
    useCourseData(courseDataTransfer);
  const { deleteSession } = useDeleteSession(refetchData);

  useEffect(() => {
    refetchCourses();
  }, [refetchCourses]);

  useEffect(() => {
    setCourses(fetchedCourses);
  }, [fetchedCourses]);

  useEffect(() => {
    refetchData();
  }, [refetchData, selectedCourse, searchKeyword, pageNum, pageSize]);

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
    [deleteSession],
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

  const handlePageChange = (page: number, newPageSize: number) => {
    dispatch(setPageNum(page));
    dispatch(setPageSize(newPageSize));
  };

  if (error) {
    return <div>{error}</div>;
  }

  const columns: ColumnsType<Session> = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: 50,
      render: (_, __, index) => (pageNum - 1) * pageSize + index + 1,
    },
    {
      title: "Session Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string, record: Session) => (
        <a
          onClick={() => handleNameClick(record)}
          style={{ cursor: "pointer" }}
        >
          {name}
        </a>
      ),
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 200,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 100,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 100,
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
      width: 100,
      render: (_, record: Session) => (
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

  const sessionDetailColumns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      render: (text: string) => <strong>{text}</strong>, // Bold font for field names
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const sessionDetailData = useMemo(() => {
    if (!selectedSessionDetail) return [];
    return [
      { field: "Name", value: selectedSessionDetail.name },
      { field: "Course Name", value: selectedSessionDetail.course_name },
      { field: "User ID", value: selectedSessionDetail.user_name },
      { field: "Description", value: selectedSessionDetail.description },
      { field: "Position Order", value: selectedSessionDetail.position_order },
      {
        field: "Created At",
        value: new Date(selectedSessionDetail.created_at).toLocaleString(),
      },
      {
        field: "Updated At",
        value: new Date(selectedSessionDetail.updated_at).toLocaleString(),
      },
      {
        field: "Deleted",
        value: selectedSessionDetail.is_deleted ? "Yes" : "No",
      },
    ];
  }, [selectedSessionDetail]);

  return (
    <>
      <div className="my-3 flex items-center justify-between">
        <div className="flex space-x-2">
          <Search
            onSearch={handleSearch}
            placeholder="Search by keyword"
            allowClear
            className="w-64"
          />
          <Select
            onChange={handleCourseChange}
            placeholder="Filter by course"
            allowClear
            className="w-64"
          >
            {courses.map((course) => (
              <Option key={course._id} value={course._id}>
                {course.name}
              </Option>
            ))}
          </Select>
        </div>
        <Button
          type="primary"
          onClick={() => setOpenAdd(true)}
          danger
          className="px-5 py-2"
        >
          Add Session
        </Button>
      </div>

      <Spin spinning={loading}>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={sessions}
            scroll={{ x: "max-content" }}
            pagination={false}
            rowKey="_id"
          />
        </div>
      </Spin>
      <Pagination
        className="mt-4 justify-end"
        current={pageNum}
        pageSize={pageSize}
        total={paginationInfo?.totalItems}
        onChange={handlePageChange}
        showSizeChanger
      />
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
        open={detailModalVisible}
        onOk={handleCloseDetailModal}
        onCancel={handleCloseDetailModal}
        footer={null}
      >
        <Table
          columns={sessionDetailColumns}
          dataSource={sessionDetailData}
          pagination={false}
          rowKey="field"
          bordered
          size="small"
        />
      </Modal>
    </>
  );
};

export default TableSessions;
