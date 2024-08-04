import { Button, Input, Modal, Space, Table, Tag, Spin } from "antd";
import { useState, useMemo, useEffect } from "react";
import { DataTransfer, Payout } from "../../models/Payout";
import { ColumnsType } from "antd/es/table";
import usePayoutsData from "../../hooks/payout/usePayoutsData";
import useChangeStatusAdmin from "../../hooks/payout/useChangeStatusAdmin";

const { Search } = Input;

const TableAdminPayout = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [loadingButtons, setLoadingButtons] = useState<{ [key: string]: boolean }>({});

  const dataTransfer = useMemo(
    (): DataTransfer => ({
      searchCondition: {
        payout_no: searchKeyword,
        instructor_id: searchKeyword,
        status: "request_payout", // Default status or any initial value
        is_instructor: false,
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 100,
      },
    }),
    [searchKeyword],
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
  } = useChangeStatusAdmin(fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const handleLoading = (id: string, isLoading: boolean) => {
    setLoadingButtons(prevState => ({ ...prevState, [id]: isLoading }));
  };

  const handleApproveClick = async (id: string) => {
    handleLoading(id, true);
    try {
      await handleApprove(id);
    } finally {
      handleLoading(id, false);
    }
  };

  const handleRejectClick = async (id: string) => {
    handleLoading(id, true);
    try {
      await handleReject(id);
    } finally {
      handleLoading(id, false);
    }
  };

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
            onClick={() => handleApproveClick(record._id)}
            loading={loadingButtons[record._id] === true}
          >
            Approve
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleRejectClick(record._id)}
            loading={loadingButtons[record._id] === true}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="my-3 flex items-center gap-2">
        <Search
          placeholder="Search by Payout No or Instructor Email"
          onSearch={handleSearch}
          allowClear
          style={{ width: 300 }}
        />
      </div>
      <Spin spinning={loading}>
        <Table
          className="my-5"
          columns={columns}
          dataSource={Array.isArray(data) ? data : []}
          loading={loading}
          rowKey="_id"
          scroll={{ x: "max-content" }}
        />
      </Spin>
      <Modal
        title="Reject Payout"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loadingButtons[Object.keys(loadingButtons)[0]] === true}
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
