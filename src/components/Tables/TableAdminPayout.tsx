import { Button, Input, Modal, Space, Table, Tag } from "antd";
import { useMemo } from "react";
import { DataTransfer, Payout } from "../../models/Payout";
import { ColumnsType } from "antd/es/table";
import usePayoutsData from "../../hooks/payout/usePayoutsData";
import useChangeStatusAdmin from "../../hooks/payout/useChangeStatusAdmin";

const TableAdminPayout = () => {
  const dataTransfer = useMemo(
    (): DataTransfer => ({
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        status: "request_payout",
        is_instructor: false,
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 100,
      },
    }),
    [],
  );

  const { data, loading, fetchData } = usePayoutsData(dataTransfer);
  const {
    handleApprove,
    handleReject,
    handleOk,
    handleCancel,
    isModalVisible,
    comment,
    setComment,
    loading: statusLoading,
  } = useChangeStatusAdmin(fetchData);

  const columns: ColumnsType<Payout> = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Instructor Email",
      dataIndex: "instructor_email",
      key: "instructor_email",
    },
    {
      title: "Balance Instructor Paid ($)",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
    },
    {
      title: "Balance Instructor Received ($)",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return <Tag color="geekblue">{status}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleApprove(record._id)}
            loading={statusLoading}
          >
            Approve
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleReject(record._id)}
            loading={statusLoading}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        className="my-5"
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title="Reject Payout"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={statusLoading}
      >
        <Input.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
          rows={4}
        />
      </Modal>
    </>
  );
};

export default TableAdminPayout;
