import { Table, Tag, Tooltip } from "antd";
import { usePurchases } from "../../hooks/purchase/usePurchase";
import { DataTransfer } from "../../models/Purchase";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useCreatePayout } from "../../hooks/payout/useCreatePayout";
import { useMemo } from "react";

const TablePurchase = () => {
  const dataTransfer = useMemo(
    (): DataTransfer => ({
      searchCondition: {
        purchase_no: "",
        cart_no: "",
        course_id: "",
        status: "",
        is_deleted: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 100,
      },
    }),
    [],
  );

  const handleCreatePayout = async (
    instructor_id: string,
    purchase_id: string,
  ) => {
    await createPayout(instructor_id, [{ purchase_id }]);
    fetchData();
  };

  const { data, loading, fetchData } = usePurchases(dataTransfer);
  const { createPayout } = useCreatePayout();

  const columns = [
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
    },
    {
      title: "Price Paid ($)",
      dataIndex: "price_paid",
      key: "price_paid",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color;
        switch (status.toLowerCase()) {
          case "new":
            color = "volcano";
            break;
          case "request_paid":
            color = "geekblue";
            break;
          case "completed":
            color = "green";
            break;
          default:
            color = "geekblue";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
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
      render: (record: any) => (
        <Tooltip title="New payout">
          <PlusSquareOutlined
            className="cursor-pointer text-red-400"
            onClick={() => handleCreatePayout(record.instructor_id, record._id)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      className="my-5"
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
    />
  );
};

export default TablePurchase;
