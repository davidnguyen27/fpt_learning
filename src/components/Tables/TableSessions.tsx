// import React, { useEffect, useState } from "react";
// import { Button, Space, Table, Tag, Input, Select, Row, Col, Modal } from "antd";
// import { getSession, updateSessionStatus } from "../../services/sessionService"; // Import your service functions
// import { SessionData, SessionSearchRequest } from "../../models/Session/Types"; // Import your types

// const { Option } = Select;
// const { Search } = Input;

// const TableSessions: React.FC = () => {
//   const [data, setData] = useState<SessionData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchText, setSearchText] = useState<string>("");
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//   const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);

//   const fetchSessions = async () => {
//     const requestData: SessionSearchRequest = {
//       searchCondition: {
//         keyword: searchText.trim(),
//         status: selectedStatus,
//       },
//     };

//     try {
//       const response = await getSession(requestData);
//       setData(response.data);
//     } catch (error) {
//       setError("Failed to fetch sessions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, [searchText, selectedStatus]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchText(e.target.value);
//   };

//   const handleSearch = (value: string) => {
//     setSearchText(value);
//   };

//   const handleStatusChange = (session: SessionData) => {
//     setSelectedSession(session);
//     setIsModalVisible(true);
//   };

//   const handleConfirmStatusChange = async () => {
//     if (selectedSession) {
//       try {
//         await updateSessionStatus(selectedSession.id, selectedSession.status === "Active" ? "Inactive" : "Active");
//         fetchSessions();
//       } catch (error) {
//         console.error("Failed to update status:", error);
//       } finally {
//         setIsModalVisible(false);
//         setSelectedSession(null);
//       }
//     }
//   };

//   const handleCancelStatusChange = () => {
//     setIsModalVisible(false);
//     setSelectedSession(null);
//   };

//   const columns = [
//     {
//       title: "No.",
//       key: "index",
//       render: (_: any, __: any, index: number) => index + 1,
//       width: 50,
//     },
//     {
//       title: "Session Name",
//       dataIndex: "sessionName",
//       key: "sessionName",
//     },
//     {
//       title: "Course Name",
//       dataIndex: "courseName",
//       key: "courseName",
//       render: (courseName: string | string[]) =>
//         Array.isArray(courseName) ? (
//           courseName.map((name, index) => (
//             <Tag key={index} style={{ marginBottom: 5 }}>
//               {name}
//             </Tag>
//           ))
//         ) : (
//           <Tag style={{ marginBottom: 5 }}>{courseName}</Tag>
//         ),
//       width: 400,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status: string, record: SessionData) => (
//         <Button
//           type="default"
//           onClick={() => handleStatusChange(record)}
//           style={{ backgroundColor: status === "Active" ? "#16a34a" : "gray", color: "white", border: "none", width: "80px", height: "32px", borderRadius: "6px" }}
//         >
//           {status.toUpperCase()}
//         </Button>
//       ),
//       width: 150,
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_: any, record: SessionData) => (
//         <Space size="middle">
//           <Button type="link" style={{ fontSize: "14px", padding: "0px 8px" }}>Edit</Button>
//           <Button type="link" danger style={{ fontSize: "14px", padding: "0px 8px" }}>Delete</Button>
//           <Button type="link" style={{ fontSize: "14px", padding: "0px 8px" }}>View</Button>
//         </Space>
//       ),
//       width: 100,
//     },
//   ];

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
//         <Col>
//           <Search
//             placeholder="Search by Session Name or Course Name"
//             onChange={handleSearchChange}
//             onSearch={handleSearch}
//             enterButton
//             style={{ width: 300 }}
//           />
//         </Col>
//         <Col>
//           <Select
//             placeholder="Filter by Status"
//             onChange={(value) => setSelectedStatus(value)}
//             allowClear
//             style={{ width: 200 }}
//           >
//             <Option value="Active">Active</Option>
//             <Option value="Inactive">Inactive</Option>
//           </Select>
//         </Col>
//       </Row>
//       <Table
//         className="my-5 rounded-none"
//         columns={columns}
//         dataSource={data}
//         pagination={{ pageSize: 5 }}
//       />
//       <Modal
//         title="Confirm Status Change"
//         visible={isModalVisible}
//         onOk={handleConfirmStatusChange}
//         onCancel={handleCancelStatusChange}
//         okText="Confirm"
//         cancelText="Cancel"
//       >
//         <p>Are you sure you want to change the status of this session?</p>
//       </Modal>
//     </div>
//   );
// };

// export default TableSessions;
