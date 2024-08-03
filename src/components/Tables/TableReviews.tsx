import React, { useCallback, useMemo, useState } from "react";
import { Table, Spin, Input, Pagination, Rate, Select } from "antd";
import { DataTransfer } from "../../models/Review";
import useReviewData from "../../hooks/review/useReviewData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { setPageNum, setPageSize } from "../../app/redux/pagination/paginationSlice";

const { Search } = Input;
const { Option } = Select;

const AdminReviewTable: React.FC = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize } = useSelector(
    (state: RootState) => state.pagination,
  );

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  const handleRatingChange = (value: number) => {
    setSelectedRating(value);
  };

  const searchCondition = useMemo(
    () => ({
      course_id: "", // specify course_id if needed
      rating: selectedRating || 0,
      is_instructor: true,
      is_rating_order: false,
      is_delete: false,
    }),
    [searchKeyword, selectedRating],
  );

  const pageInfo = useMemo(
    () => ({
      pageNum,
      pageSize,
    }),
    [pageNum, pageSize],
  );

  const dataTransfer: DataTransfer = useMemo(
    () => ({
      searchCondition,
      pageInfo,
    }),
    [searchCondition, pageInfo],
  );

  const { data, loading, pageInfo: paginationInfo } = useReviewData(dataTransfer);

  // Define columns for the table
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: 50,
      render: (_: any, __: any, index: any) => (pageNum - 1) * pageSize + index + 1,
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: 250,
    },
    {
      title: "Reviewer Name",
      dataIndex: "reviewer_name",
      key: "reviewer_name",
      width: 200,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: 250,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 150,
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
  ];

  const handlePageChange = (page: number, newPageSize: number) => {
    dispatch(setPageNum(page));
    dispatch(setPageSize(newPageSize));
  };

  const paginatedData = useMemo(() => {
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, pageNum, pageSize]);

  // Render table with error and loading handling
  return (
    <>
      <div className="my-3 flex flex-wrap items-center gap-2">
        <Search
          onSearch={handleSearch}
          placeholder="Search by keyword"
          allowClear
          className="w-64"
        />
        <Select
          onChange={handleRatingChange}
          placeholder="Filter by rating"
          allowClear
          className="w-44"
        >
          {[...Array(5)].map((_, i) => (
            <Option key={i + 1} value={i + 1}>
              <Rate disabled defaultValue={i + 1} />
            </Option>
          ))}
        </Select>
      </div>
      <Spin spinning={loading}>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={paginatedData}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </div>
      </Spin>
      <Pagination
        className="justify-end mt-4"
        current={pageNum}
        pageSize={pageSize}
        total={paginationInfo?.totalItems}
        onChange={handlePageChange}
        showSizeChanger
        showQuickJumper
      />
    </>
  );
};

export default AdminReviewTable;
