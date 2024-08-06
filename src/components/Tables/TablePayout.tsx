import { Button, Pagination, Spin, Table, Tag, Input, Modal } from "antd";
import { useMemo, useState, useCallback, useEffect } from "react";
import { DataTransfer, Payout } from "../../models/Payout";
import { ColumnsType } from "antd/es/table";
import usePayoutsData from "../../hooks/payout/usePayoutsData";
import useChangeStatusInstructor from "../../hooks/payout/useChangeStatusInstructor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import {
  setPageNum,
  setPageSize,
} from "../../app/redux/pagination/paginationSlice";
import { formatDate } from "../../utils/formatDate";

// Format function for monetary values
const formatCurrency = (value: number) => 
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const { Search } = Input;

const TablePayout = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize } = useSelector(
    (state: RootState) => state.pagination,
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const dataTransfer = useMemo(
    (): DataTransfer => ({
      searchCondition: {
        payout_no: searchKeyword,
        instructor_id: "",
        status: "",
        is_instructor: false,
        is_delete: false,
      },
      pageInfo: {
        pageNum,
        pageSize,
      },
    }),
    [searchKeyword, pageNum, pageSize],
  );

  const { data, totalItems, loading, fetchData } = usePayoutsData(dataTransfer);
  const { handleRequestPayout } = useChangeStatusInstructor(fetchData);

  useEffect(() => {
    fetchData(); // Fetch data when searchKeyword or pagination changes
  }, [searchKeyword, pageNum, pageSize, fetchData]);

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  const handlePageChange = (page: number, newPageSize: number) => {
    dispatch(setPageNum(page));
    dispatch(setPageSize(newPageSize));
  };

  const handlePayoutClick = (record: Payout) => {
    setSelectedPayout(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedPayout(null);
  };

  const dataWithIndex = data?.map((item, index) => ({
    ...item,
    index: (pageNum - 1) * pageSize + index + 1,
  }));

  const columns: ColumnsType<Payout & { index: number }> = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 50,
    },
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
      render: (payout_no: string, record) => (
        <a onClick={() => handlePayoutClick(record)}>{payout_no}</a>
      ),
    },
    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color;
        switch (status.toLowerCase()) {
          case "new":
          case "reject":
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
      render: (text: string) => formatDate(text),
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

  const transactionColumns: ColumnsType<Payout['transactions'][number]> = [
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
      render: (value: number) => `${value.toFixed(2)}%`,
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
    },
  ];

  return (
    <>
      <div className="my-3 flex items-center gap-2">
        <Search
          onSearch={handleSearch}
          placeholder="Search by Payout No"
          allowClear
          className="w-64"
        />
      </div>
      <Spin spinning={loading}>
        <Table
          className="my-5"
          columns={columns}
          dataSource={dataWithIndex}
          loading={loading}
          rowKey="_id"
          scroll={{ x: "max-content" }}
        />
      </Spin>
      <Pagination
        current={pageNum}
        pageSize={pageSize}
        total={totalItems} // Update this to the actual total items count if available
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "right", justifyContent: "end" }}
        showSizeChanger
      />

      {/* Modal to display transaction details */}
      <Modal
        title={`Transactions for Payout No: ${selectedPayout?.payout_no}`}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <Table
          columns={transactionColumns}
          dataSource={selectedPayout?.transactions || []}
          pagination={false}
          rowKey="_id"
        />
      </Modal>
    </>
  );
};

export default TablePayout;
