import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTransfer } from "../../models/Course";
import useCourseDataClient from "../../hooks/course/useCourseDataClient";
import { Rate } from "antd";

interface CourseCardProps {
  category_id: string;
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
  const { category_id } = props;
  const navigate = useNavigate();
  const [searchKeyword] = useState<string>("");

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      category_id,
      status: "",
      is_delete: false,
    }),
    [searchKeyword, category_id],
  );

  const pageInfo = useMemo(
    () => ({
      pageNum: 1,
      pageSize: 10,
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

  const {
    data: courses,
    loading,
    error,
    refetchData,
  } = useCourseDataClient(dataTransfer);

  useEffect(() => {
    refetchData();
  }, [refetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {courses.map((item: any) => (
        <article
          key={item._id}
          className="flex w-80 flex-col justify-between rounded-md bg-slate-200 p-4 transition-transform duration-300 hover:scale-105 hover:bg-slate-300"
          onClick={() => navigate(`/detail/${item._id}`)}
        >
          <div>
            <img
              src={item.image_url || "default-image-url"}
              alt={item.name}
              className="h-40 w-full rounded-md object-cover"
            />
          </div>
          <h3 className="mt-3 h-12 overflow-hidden overflow-ellipsis text-lg font-semibold">
            {item.name}
          </h3>
          <div className="my-2 text-xs font-light">{item.category_name}</div>
          <div className="my-2 flex items-center">
            <Rate disabled value={item.average_rating} />
            <span className="ml-2 text-sm font-medium">
              {item.average_rating}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs">
              By{" "}
              <span className="font-semibold">
                {item.instructor_name || "Unknown Instructor"}
              </span>
            </p>
            <i className="fa-solid fa-cart-plus cursor-pointer hover:text-red-500"></i>
            <span
              className={`${item.discount !== 0 ? "line-through" : ""} text-gray-400`}
            >
              ${item.price}
            </span>
            <span className="text-lg font-semibold text-red-500">
              ${item.price_paid}
            </span>
          </div>
        </article>
      ))}
    </>
  );
};

export default CourseCard;
