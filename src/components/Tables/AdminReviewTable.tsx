import React, { useCallback, useMemo, useState } from "react";
import { Space, Table, message, Modal, Spin, Input } from "antd";
import { Review, DataTransfer } from "../../models/Review";
import useReviewData from "../../hooks/review/useReviewData";
import useDeleteReview from "../../hooks/review/useDeleteReview";

const { Search } = Input;

const AdminReviewTable: React.FC = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
  
    const handleSearch = useCallback((value: string) => {
      setSearchKeyword(value);
    }, []);
  
    const searchCondition = useMemo(
      () => ({
        course_id: "", // specify course_id if needed
      rating: 0,
      is_instructor: false,
      is_rating_order: false,
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
  
    const { data, loading, error, refetchData } = useReviewData(dataTransfer);
    const { deleteReview } = useDeleteReview(refetchData);
  
  
    const handleDelete = useCallback(
      (reviewId: string) => {
        Modal.confirm({
          title: "Are you sure you want to delete this review?",
          onOk: () => deleteReview(reviewId),
        });
      },
      [deleteReview],
    );

  // Define columns for the table
  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Reviewer Name",
      dataIndex: "reviewer_name",
      key: "reviewer_name",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Review) => (
        <Space size="middle">
          <a>
            <i className="fa-solid fa-eye"></i>
          </a>
          <a onClick={() => handleDelete(record._id)}>
            <i className="fa-solid fa-trash"></i>
          </a>
        </Space>
      ),
    },
  ];

  // Render table with error and loading handling
  return (
    <>
    <div className="my-3 flex flex-wrap items-center justify-between gap-2">
        <Search
          onSearch={handleSearch}
          placeholder="Search by keyword"
          allowClear
          className="w-full md:w-1/3"
        />
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
      </>
  );
};

export default AdminReviewTable;
