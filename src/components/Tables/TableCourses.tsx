import React, { useCallback, useMemo, useState } from "react";
import { DeleteOutlined, FormOutlined, SendOutlined } from "@ant-design/icons";
import { Table, Spin, Modal, Input, Tag, Button, Drawer } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Course, DataTransfer } from "../../models/Course";
import useCourseData from "../../hooks/course/useCourseData";
import useDeleteCourse from "../../hooks/course/useDeleteCourse";
import ModalAddCourse from "../Modal/ModalAddCourse";
import ModalEditCourse from "../Modal/ModalEditCourse";
import { toggleCourseStatus } from "../../services/coursesService"; // Import the toggleCourseStatus function

const { Search } = Input;

const TableCourses: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
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

  const handleNameClick = (course: Course) => {
    setSelectedCourseDetail(course);
    setDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedCourseDetail(null);
  };

  const handleChangeStatus = useCallback(
    async (courseId: string, currentStatus: string) => {
      let newStatus = "";
      if (currentStatus === "new") {
        newStatus = "waiting_approve";
      } else if (currentStatus === "waiting_approve") {
        newStatus = "approve"; // Adjust this as necessary based on your status flow
      } else if (currentStatus === "approve") {
        newStatus = "active";
      }

      if (newStatus) {
        try {
          await toggleCourseStatus(courseId, newStatus, comment);
          refetchData();
          setDrawerVisible(false); // Close the drawer after status change
        } catch (error) {
          console.error("Error changing status:", error);
        }
      } else {
        console.error("Invalid status change:", currentStatus, "->", newStatus);
      }
    },
    [refetchData, comment]
  );

  const openCommentDrawer = useCallback((courseId: string) => {
    setCurrentCourseId(courseId);
    setDrawerVisible(true);
  }, []);

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
    return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
  };

  const columns: ColumnsType<Course> = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string, record: Course) => (
        <a onClick={() => handleNameClick(record)} style={{ cursor: "pointer" }}>
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
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
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
      title: "Action",
      key: "action",
      width: 200,
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
          <Button
            type="primary"
            onClick={() => openCommentDrawer(record._id)}
            disabled={record.status === "waiting_approve"}
          >
            {record.status === "new"
              ? "Send for Approval"
              : record.status === "approve"
              ? "Activate"
              : "Waiting"}
          </Button>
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
      <Modal
        title="Course Details"
        visible={detailModalVisible}
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
              <p>Created At: {new Date(selectedCourseDetail.created_at).toLocaleString()}</p>
              <p>Updated At: {new Date(selectedCourseDetail.updated_at).toLocaleString()}</p>
              <p>Description: {selectedCourseDetail.description}</p>
              <p>Price: {selectedCourseDetail.price}</p>
              <p>Discount: {selectedCourseDetail.discount}</p>
              <p>Content: {selectedCourseDetail.content}</p>
            </div>
            <div className="ml-4">
              {selectedCourseDetail.video_url && (
                <div className="mb-2">
                  <a href={selectedCourseDetail.video_url} target="_blank" rel="noopener noreferrer">
                    Video URL
                  </a>
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeEmbedUrl(selectedCourseDetail.video_url)}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full mt-2"
                  ></iframe>
                </div>
              )}
              {selectedCourseDetail.image_url && (
                <div>
                  <a href={selectedCourseDetail.image_url} target="_blank" rel="noopener noreferrer">
                    Image URL
                  </a>
                  <img src={selectedCourseDetail.image_url} alt="Course" className="w-full mt-2" />
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
        visible={drawerVisible}
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
              handleChangeStatus(currentCourseId, selectedCourseDetail?.status || "new");
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
