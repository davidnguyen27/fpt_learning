import React, { useCallback, useMemo, useState } from "react";
import { DeleteOutlined, FormOutlined, SendOutlined } from "@ant-design/icons";
import {
  Table,
  Spin,
  Modal,
  Input,
  Tag,
  Button,
  Drawer,
  Space,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Course, DataTransfer } from "../../models/Course";
import useCourseData from "../../hooks/course/useCourseData";
import useDeleteCourse from "../../hooks/course/useDeleteCourse";
import ModalAddCourse from "../Modal/ModalAddCourse";
import ModalEditCourse from "../Modal/ModalEditCourse";
import { toggleCourseStatus } from "../../services/coursesService";

const { Search } = Input;

const TableCourses: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] =
    useState<Course | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);

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
      pageSize: 100,
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
      if (currentStatus === "new" || currentStatus === "reject") {
        newStatus = "waiting_approve";
      } else if (currentStatus === "waiting_approve") {
        newStatus = "approve";
      } else if (currentStatus === "reject") {
        newStatus = "waiting_approve";
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
          setDrawerVisible(false);
          message.success(`Course status updated to ${newStatus}`);
        } catch (error) {
          console.error("Error changing status:", error);
          message.error("Failed to update course status");
        }
      } else {
        console.error("Invalid status change:", currentStatus, "->", newStatus);
      }
    },
    [refetchData],
  );

  const openCommentDrawer = useCallback(
    (courseId: string, currentStatus: string) => {
      setCurrentCourseId(courseId);
      setDrawerVisible(true);
      setComment(
        currentStatus === "waiting_approve"
          ? ""
          : "",
      );
    },
    [],
  );

  const closeCommentDrawer = useCallback(() => {
    setDrawerVisible(false);
    setComment("");
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    return ampersandPosition !== -1
      ? videoId.substring(0, ampersandPosition)
      : videoId;
  };

  const renderActionButton = (record: Course) => {
    let buttonClass = "";
    let buttonText = "";
    let buttonDisabled = false;

    switch (record.status) {
      case "new":
      case "reject":
        buttonClass = "bg-yellow-300 text-gray-500";
        buttonText = "Send for Approval";
        break;
      case "waiting_approve":
        buttonClass = "bg-blue-500";
        buttonText = "Waiting";
        buttonDisabled = true; // Disable the button when status is "waiting_approve"
        break;
      case "approve":
        buttonClass = "bg-green-500";
        buttonText = "Activate Course";
        break;
      case "reject":
        buttonClass = "bg-blue-500";
        buttonText = "Send for Approval";
        break;
      case "active":
        buttonClass = "bg-red-500";
        buttonText = "Deactivate Course";
        break;
      case "inactive":
        buttonClass = "bg-green-500";
        buttonText = "Activate Course";
        break;
      default:
        buttonDisabled = true;
        buttonText = "Unknown Status";
        break;
    }

    return (
      <Button
        type="primary"
        className={buttonClass}
        onClick={() => openCommentDrawer(record._id, record.status)}
        disabled={buttonDisabled}
      >
        {buttonText}
      </Button>
    );
  };

  const columns: ColumnsType<Course> = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      width: 150,
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
      width: 80,
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
      render: (date: string) => new Date(date).toDateString(),
      width: 150,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date: string) => new Date(date).toDateString(),
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <FormOutlined
            onClick={() => handleEdit(record._id)}
            className="cursor-pointer text-blue-500"
          />
          <DeleteOutlined
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(record._id)}
          />
          {renderActionButton(record)}
        </Space>
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
            scroll={{ x: "max-content" }}
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
      <Modal
        title="Course Details"
        open={detailModalVisible}
        onOk={handleCloseDetailModal}
        onCancel={handleCloseDetailModal}
        footer={null}
      >
        {selectedCourseDetail && (
          <div className="flex">
            <div>
              <p>Name: {selectedCourseDetail.name}</p>
              <p>Category: {selectedCourseDetail.category_name}</p>
              <p>Status: {selectedCourseDetail.status}</p>
              <p>
                Created At:{" "}
                {new Date(selectedCourseDetail.created_at).toLocaleString()}
              </p>
              <p>
                Updated At:{" "}
                {new Date(selectedCourseDetail.updated_at).toLocaleString()}
              </p>
              <p>Description: {selectedCourseDetail.description}</p>
              <p>Price: {selectedCourseDetail.price}</p>
              <p>Discount: {selectedCourseDetail.discount}</p>
              <p>Content: {selectedCourseDetail.content}</p>
            </div>
            <div className="ml-4">
              {selectedCourseDetail.video_url && (
                <div className="mb-2">
                  <a
                    href={selectedCourseDetail.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video URL
                  </a>
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(selectedCourseDetail.video_url)}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="mt-2 w-full"
                  ></iframe>
                </div>
              )}
              {selectedCourseDetail.image_url && (
                <div>
                  <a
                    href={selectedCourseDetail.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Image URL
                  </a>
                  <img
                    src={selectedCourseDetail.image_url}
                    alt="Course"
                    className="mt-2 w-full"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
      <Drawer
        title="Add Comment"
        placement="right"
        closable={false}
        onClose={closeCommentDrawer}
        open={drawerVisible}
        width={300}
      >
        <Input.TextArea
          rows={4}
          placeholder="Comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={() => {
            if (currentCourseId) {
              const currentCourse = data.find(
                (course) => course._id === currentCourseId,
              );
              if (currentCourse) {
                const newStatus = (() => {
                  switch (currentCourse.status) {
                    case "new":
                      return "waiting_approve";
                    case "approve":
                      return "active";
                    case "reject":
                      return "waiting_approve";
                    case "active":
                      return "inactive";
                    case "inactive":
                      return "active";
                    case "reject":
                      return "waiting_approve";
                    default:
                      return null;
                  }
                })();
                if (newStatus) {
                  handleChangeStatus(
                    currentCourseId,
                    currentCourse.status,
                    comment,
                  );
                }
              }
            }
          }}
          style={{ marginTop: 16 }}
          block
        >
          Confirm
        </Button>
      </Drawer>
    </>
  );
};

export default TableCourses;
