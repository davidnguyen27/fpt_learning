import { Button, Table, Tag } from "antd";
import { useMemo } from "react";
import { DataTransfer, Payout } from "../../models/Payout";
import { ColumnsType } from "antd/es/table";
import usePayoutsData from "../../hooks/payout/usePayoutsData";
import useChangeStatusInstructor from "../../hooks/payout/useChangeStatusInstructor";

const TablePayout = () => {
  const dataTransfer = useMemo(
    (): DataTransfer => ({
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        status: "",
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
  const { handleRequestPayout } = useChangeStatusInstructor(fetchData);

  const columns: ColumnsType<Payout> = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Balance Origin ($)",
      dataIndex: "balance_origin",
      key: "balance_origin",
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
        let color;
        switch (status.toLowerCase()) {
          case "new" || "reject":
            color = "volcano";
            break;
          case "request_payout":
            color = "geekblue";
            break;
          case "completed":
            color = "green";
            break;
          default:
            color = "geekblue";
        }
        return <Tag color={color}>{status}</Tag>;
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
      render: (_, record) =>
        record.status.toLowerCase() === "completed" ? null : (
          <Button
            type="primary"
            onClick={() => handleRequestPayout(record._id)}
            disabled={record.status.toLowerCase() === "request_payout"}
          >
            Request Payout
          </Button>
        ),
    },
  ];

  return (
    <Table
      className="my-5"
      columns={columns}
      dataSource={Array.isArray(data) ? data : []}
      loading={loading}
      rowKey="_id"
    />
  );
};

export default TablePayout;
