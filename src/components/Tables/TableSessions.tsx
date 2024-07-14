import React, { useEffect, useState } from "react";
import { Table, Tag, Input, Row, Col, Modal, Tooltip } from "antd";
import { deleteSession, getSession, updateSession } from "../../services/sessionService"; // Import your service functions
import { SessionData, SessionSearchRequest } from "../../models/Session/Types"; // Import your types
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalCreateSession from "../Modal/ModalCreateSession";

const { Search } = Input;

const TableSessions: React.FC = () => {
  const [data, setData] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [postionOrder] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [courseId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedSessionDetail, setSelectedSessionDetail] = useState<SessionData | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [editedSession, setEditedSession] = useState<SessionData | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [pagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchSessions();
  }, [
    searchText,
    courseId,
    postionOrder,
    pagination.current,
    pagination.pageSize,
  ]);
  const fetchSessions = async () => {
    const requestData: SessionSearchRequest = {
      searchCondition: {
        keyword: searchText.trim(),
        course_id: courseId,	
        is_position_order: postionOrder,
        is_delete: false,
      },
      pageInfo: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      },
    };

    try {
      const response = await getSession(requestData);
      setData(response.data.pageData);
    } catch (error) {
      setError("Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [searchText]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleNameClick = (session: SessionData) => {
    setSelectedSessionDetail(session);
    setDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedSessionDetail(null);
  };

  const handleUpdate = (session: SessionData) => {
    setEditedSession(session);
    setIsEditModalVisible(true);
  };

  const handleUpdateConfirm = async (updatedSessionData: Partial<SessionData>) => {
    if (editedSession) {
      try {
        const updatedSession = await updateSession(editedSession._id, updatedSessionData);
        setEditedSession(null);
        setIsEditModalVisible(false);
        fetchSessions();
        console.log("Updated Session:", updatedSession);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };
  const handleUpdateCancel = () => {
    setEditedSession(null);
    setIsEditModalVisible(false);

  };
  const handleDelete = (session: SessionData) => {
    setSelectedSession(session);
    setIsModalVisible(true);

  };

  const handleConfirmDelete = async () => {
    if (selectedSession) {
      try {
        await deleteSession(selectedSession._id);
        setIsModalVisible(false);
        fetchSessions();

      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedSession(null);
  };

  const columns = [
    {
        title: "No",
        key: "no",
        render: (_: any, __: any, index: number) => {
          return (pagination.current - 1) * pagination.pageSize + index + 1;
        },
      },
      {
        title: "Session Name",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: SessionData) => (
          <a onClick={() => handleNameClick(record)} style={{ cursor: "pointer" }}>
            {name}
          </a>
        ),
      },
    {
        title: "Course Id",
        dataIndex: "course_id",
        key: "course_id",
        render: (course_id: string) => (
          <Tag color="geekblue">{course_id}</Tag>
        ),
      },
    
      {
        title: "Action",
        key: "action",
        render: (_: any, record: SessionData) => (
          <div>
            <Tooltip title="Edit">
              <EditOutlined
                onClick={() => handleUpdate(record)}
                style={{ fontSize: "16px", marginRight: 16, cursor: "pointer" }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteOutlined
                onClick={() => handleDelete(record)}
                style={{ fontSize: "16px", color: "red", cursor: "pointer" }}
              />
            </Tooltip>
          </div>
        ),
      },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      ></div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col>
          <Search
            placeholder="Search by Session Name"
            onChange={handleSearchChange}
            onSearch={handleSearch}
            enterButton
            style={{ width: 300 }}
          />
        </Col>
        
      </Row>
      <div>
          <button
            className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
            onClick={() => setIsOpen(true)}
          >
            Create Session
          </button>
          <ModalCreateSession isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      <Table
        className="my-5 rounded-none"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
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
            <p>Id: {selectedSessionDetail._id}</p>
            <p>Name: {selectedSessionDetail.name}</p>
            <p>Is Deleted: {selectedSessionDetail.is_delete}</p>
            <p>Course Id: {selectedSessionDetail.course_id}</p>
            <p>Is Created: {selectedSessionDetail.created_at}</p>
            <p>Is Updated: {selectedSessionDetail.updated_at}</p>
            <p>Des: {selectedSessionDetail.description}</p>
            <p>Pos: {selectedSessionDetail.position_order}</p>
            
          </div>
        )}
      </Modal>
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
      <Modal
        title="Edit Session"
        visible={isEditModalVisible}
        onOk={() => editedSession && handleUpdateConfirm(editedSession)}
        onCancel={handleUpdateCancel}
        okText="Update"
        cancelText="Cancel"
      >
        {editedSession && (
          <div>
            <p>Name:</p>
            <Input
              value={editedSession.name}
              onChange={(e) =>
                setEditedSession({ ...editedSession, name: e.target.value })
              }
              placeholder="Enter session name"
              style={{ marginBottom: 16 }}
            />
            <p>Course Id:</p>
            <Input
              value={editedSession.course_id}
              onChange={(e) =>
                setEditedSession({ ...editedSession, course_id: e.target.value })
              }
              placeholder="Enter email"
              style={{ marginBottom: 16 }}
            />
            <p>Position Order:</p>
            <Input
              value={editedSession.position_order}
              onChange={(e) =>
                setEditedSession({...editedSession, position_order: Number(e.target.value),})
              }
              placeholder="Input position order"
              style={{ marginBottom: 16 }}
            />
            <p>Description:</p>
            <Input
              value={editedSession.description}
              onChange={(e) =>
                setEditedSession({ ...editedSession, description: e.target.value })
              }
              placeholder="Add Video Link"
              style={{ marginBottom: 16 }}
            />
          </div>
        )}
      </Modal>
      </>
    </div>
  );
};

export default TableSessions;
