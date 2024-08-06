import { Table, Tag, Tooltip, Input, Spin, Pagination, Select } from "antd";
import { usePurchases } from "../../hooks/purchase/usePurchase";
import { DataTransfer } from "../../models/Purchase";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useCreatePayout } from "../../hooks/payout/useCreatePayout";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import {
  setPageNum,
  setPageSize,
} from "../../app/redux/pagination/paginationSlice";
import { ColumnsType } from "antd/es/table";

// Utility function to format currency
const formatCurrency = (value: number) => 
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const { Search } = Input;
const { Option } = Select;

const TablePurchase = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize } = useSelector(
    (state: RootState) => state.pagination,
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const dataTransfer = useMemo(
    (): DataTransfer => ({
      searchCondition: {
        purchase_no: searchKeyword,
        cart_no: "",
        course_id: "",
        status: statusFilter,
        is_deleted: false,
      },
      pageInfo: {
        pageNum,
        pageSize,
      },
    }),
    [searchKeyword, statusFilter, pageNum, pageSize],
  );
  
  const handlePageChange = (page: number, newPageSize: number) => {
    dispatch(setPageNum(page));
    dispatch(setPageSize(newPageSize));
  };

  const handleCreatePayout = async (
    instructor_id: string,
    purchase_id: string,
  ) => {
    await createPayout(instructor_id, [{ purchase_id }]);
    fetchData();
  };

  const { data, loading, fetchData } = usePurchases(dataTransfer);
  const { createPayout } = useCreatePayout();

  const dataWithIndex = data?.map((item, index) => ({
    ...item,
    index: (pageNum - 1) * pageSize + index + 1,
  }));

  const columns: ColumnsType<{ index: number }> = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 50,
    },
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (value: number) => `${value}%`,
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
      render: (record: any) => {
        if (record.status.toLowerCase() === "completed") {
          return null; // or return <></>;
        }
        return (
          <Tooltip title="New payout">
            <PlusSquareOutlined
              className="cursor-pointer text-red-400"
              onClick={() =>
                handleCreatePayout(record.instructor_id, record._id)
              }
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-3 flex items-center gap-2">
        <Search
          onSearch={handleSearch}
          placeholder="Search by Purchase No"
          allowClear
          className="w-64"
        />
        <Select
          placeholder="Filter by Status"
          allowClear
          className="w-64"
          onChange={handleStatusChange}
          value={statusFilter}
        >
          <Option value="">All</Option>
          <Option value="new">New</Option>
          <Option value="request_paid">Request Paid</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </div>
      <Spin spinning={loading}>
        <Table
          className="my-5"
          columns={columns}
          dataSource={dataWithIndex}
          pagination={false}
          rowKey="_id"
          scroll={{ x: "max-content" }}
        />
        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={data?.length || 0} // Update this to the actual total items count if available
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: "right", justifyContent: "end" }}
          showSizeChanger
        />
      </Spin>
    </>
  );
};

export default TablePurchase;
