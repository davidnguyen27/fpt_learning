import React, { useCallback, useMemo, useState } from "react";
import { Table, Spin, Input } from "antd";
import { DataTransfer } from "../../models/Review";
import useReviewData from "../../hooks/review/useReviewData";

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
      is_instructor: true,
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
  
    const { data, loading } = useReviewData(dataTransfer);
  

  // Define columns for the table
  const columns = [
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
      width: 80,
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
