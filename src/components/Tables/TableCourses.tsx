import React, { useCallback, useMemo, useState } from "react";
import {
  CheckOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  PlayCircleOutlined,
  SendOutlined,
  StopOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Table,
  Spin,
  Modal,
  Input,
  Tag,
  Button,
  Space,
  message,
  Descriptions,
  Pagination,
  Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Course, DataTransfer } from "../../models/Course";
import useCourseData from "../../hooks/course/useCourseData";
import useDeleteCourse from "../../hooks/course/useDeleteCourse";
import ModalAddCourse from "../Modal/ModalAddCourse";
import ModalEditCourse from "../Modal/ModalEditCourse";
import { toggleCourseStatus } from "../../services/coursesService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import {
  setPageNum,
  setPageSize,
} from "../../app/redux/pagination/paginationSlice";
import useCourseLogs from "../../hooks/courseLogs/useCourseLogs";
import { formatDate } from "../../utils/formatDate";

const { Search } = Input;

const TableCourses: React.FC = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize } = useSelector(
    (state: RootState) => state.pagination,
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] =
    useState<Course | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const {
    logs,
    loading: logsLoading,
    error: logsError,
  } = useCourseLogs(selectedCourseDetail?._id || "");

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  const handlePageChange = (page: number, newPageSize: number) => {
    dispatch(setPageNum(page));
    dispatch(setPageSize(newPageSize));
  };

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
      pageNum,
      pageSize,
    }),
    [pageNum, pageSize],
  );

  const dataTransfer: DataTransfer = useMemo(
    () => ({
      searchCondition,
      pageInfo,
    }),
    [searchCondition, pageInfo],
  );

  const { data, loading, refetchData } = useCourseData(dataTransfer);
  const { deleteCourse } = useDeleteCourse(refetchData);

  const handleSuccess = useCallback(() => {
    refetchData(); // This should reload the data
  }, [refetchData]);

  const handleDelete = useCallback(
    (courseId: string) => {
      Modal.confirm({
        title: "Are you sure you want to delete this course?",
        onOk: () => deleteCourse(courseId),
      });
    },
    [deleteCourse],
  );

  const handleEdit = useCallback((courseId: string) => {
    setEditingCourseId(courseId);
    setOpenEdit(true);
  }, []);

  const handleNameClick = (course: Course) => {
    setSelectedCourseDetail(course);
    setDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedCourseDetail(null);
  };

  const handleChangeStatus = useCallback(
    async (courseId: string, currentStatus: string, comment: string = "") => {
      let newStatus = "";
      let course = data?.find((course) => course._id === courseId); // Find the course data

      if (!course) {
        message.error("Course not found.");
        return;
      }

      if (currentStatus === "new" || currentStatus === "reject") {
        // Check if session_count and lesson_count are available
        if (course.session_count === 0 || course.lesson_count === 0) {
          message.error(
            "This course is not eligible to change status, please add sessions and lessons to the course.",
          );
          return;
        }
        newStatus = "waiting_approve";
      } else if (currentStatus === "waiting_approve") {
        newStatus = "approve";
      } else if (currentStatus === "approve") {
        newStatus = "active";
      } else if (currentStatus === "active") {
        newStatus = "inactive";
      } else if (currentStatus === "inactive") {
        newStatus = "active";
      }

      if (newStatus) {
        try {
          await toggleCourseStatus(courseId, newStatus, comment);
          refetchData();
          message.success(`Course status updated to ${newStatus}`);
        } catch (error) {
          console.error("Error changing status:", error);
          message.error("Failed to update course status");
        }
      } else {
        console.error("Invalid status change:", currentStatus, "->", newStatus);
      }
    },
    [data, refetchData],
  );

  const renderActionIcon = (record: Course) => {
    let icon = null;
    let onClick = () => {};
    let tooltipTitle = "";

    switch (record.status) {
      case "new":
      case "reject":
        icon = <SendOutlined style={{ color: "#F9D71C" }} />;
        onClick = () => handleChangeStatus(record._id, record.status);
        tooltipTitle = "Send for approval";
        break;
      case "waiting_approve":
        icon = <ClockCircleOutlined style={{ color: "#A9A9A9" }} />;
        tooltipTitle = "Waiting for approval";
        break;
      case "approve":
        icon = <CheckOutlined style={{ color: "#52C41A" }} />;
        onClick = () => handleChangeStatus(record._id, record.status);
        tooltipTitle = "Public Course";
        break;
      case "active":
        icon = <StopOutlined style={{ color: "#F5222D" }} />;
        onClick = () => handleChangeStatus(record._id, record.status);
        tooltipTitle = "Deactivate";
        break;
      case "inactive":
        icon = <PlayCircleOutlined style={{ color: "#52C41A" }} />;
        onClick = () => handleChangeStatus(record._id, record.status);
        tooltipTitle = "Activate";
        break;
      default:
        icon = <WarningOutlined style={{ color: "#D9D9D9" }} />;
        tooltipTitle = "Unknown status";
        break;
    }

    return (
      <Tooltip title={tooltipTitle}>
        <div onClick={onClick} style={{ cursor: icon ? "pointer" : "default" }}>
          {icon}
        </div>
      </Tooltip>
    );
  };

  const dataWithIndex = data?.map((item, index) => ({
    ...item,
    index: (pageNum - 1) * pageSize + index + 1,
  }));

  const columns: ColumnsType<Course & { index: number }> = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 50,
    },
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (name: string, record: Course) => (
        <a
          onClick={() => handleNameClick(record)}
          style={{ cursor: "pointer" }}
        >
          {name}
        </a>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Tag
          color={
            status === "active"
              ? "green"
              : status === "approve"
                ? "blue"
                : status === "waiting_approve"
                  ? "yellow"
                  : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
      width: 150,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date: string) => formatDate(date),
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Course">
            <FormOutlined
              onClick={() => handleEdit(record._id)}
              className="cursor-pointer text-blue-500"
            />
          </Tooltip>
          <Tooltip title="Delete Course">
            <DeleteOutlined
              className="cursor-pointer text-red-500"
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>

          {renderActionIcon(record)}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="my-3 flex flex-wrap items-center justify-between gap-2">
        <Search
          placeholder="Search course"
          onSearch={handleSearch}
          style={{ width: 254 }}
        />
        <Button
          type="primary"
          danger
          onClick={() => setOpenAdd(true)}
          className="px-5 py-2"
        >
          Add Course
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          dataSource={dataWithIndex}
          columns={columns}
          pagination={false}
          rowKey="_id"
          bordered
        />
      </Spin>
      {data && (
        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={10}
          onChange={handlePageChange}
          showSizeChanger
          className="mt-4 justify-end"
        />
      )}
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
      <Modal
        title="Course Details"
        open={detailModalVisible}
        onOk={handleCloseDetailModal}
        onCancel={handleCloseDetailModal}
        footer={null}
        style={{ width: "33.33vw" }}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }} // Điều chỉnh chiều cao nội dung và thêm thanh cuộn nếu cần
      >
        {selectedCourseDetail && (
          <>
            <Descriptions
              bordered
              column={1}
              labelStyle={{ fontWeight: "bold" }}
            >
              <Descriptions.Item label="Name">
                {selectedCourseDetail.name}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {selectedCourseDetail.category_name}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {selectedCourseDetail.status} 
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(selectedCourseDetail.created_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                {new Date(selectedCourseDetail.updated_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                {selectedCourseDetail.price}
              </Descriptions.Item>
              <Descriptions.Item label="Discount">
                {selectedCourseDetail.discount}
              </Descriptions.Item>
              {selectedCourseDetail.video_url && (
                <Descriptions.Item label="Video URL">
                  <a
                    href={selectedCourseDetail.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </a>
                </Descriptions.Item>
              )}
              {selectedCourseDetail.image_url && (
                <Descriptions.Item label="Image">
                  <img
                    src={selectedCourseDetail.image_url}
                    alt="Course"
                    style={{ maxWidth: "100%" }}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>
            <h3 className="mt-4">Course Status Logs</h3>
            <Spin spinning={logsLoading}>
              {logsError ? (
                <p>{logsError}</p>
              ) : (
                <Table
                  dataSource={logs}
                  columns={[
                    {
                      title: "Old Status",
                      dataIndex: "old_status",
                      key: "old_status",
                      render: (old_status: string) => (
                        <Tag
                          color={
                            old_status === "active"
                              ? "green"
                              : old_status === "approve"
                                ? "blue"
                                : old_status === "waiting_approve"
                                  ? "yellow"
                                  : "red"
                          }
                        >
                          {old_status}
                        </Tag>
                      ),
                    },
                    {
                      title: "New Status",
                      dataIndex: "new_status",
                      key: "new_status",
                      render: (new_status: string) => (
                        <Tag
                          color={
                            new_status === "active"
                              ? "green"
                              : new_status === "approve"
                                ? "blue"
                                : new_status === "waiting_approve"
                                  ? "yellow"
                                  : "red"
                          }
                        >
                          {new_status}
                        </Tag>
                      ),
                    },
                    {
                      title: "Created At",
                      dataIndex: "created_at",
                      key: "created_at",
                      render: (date: string) => new Date(date).toLocaleString(),
                    },
                  ]}
                  pagination={false}
                  rowKey="_id"
                  bordered
                />
              )}
            </Spin>
          </>
        )}
      </Modal>
    </>
  );
};

export default TableCourses;
