import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTransfer } from "../../models/Course";
import useCourseDataClient from "../../hooks/course/useCourseDataClient";
import { Rate } from "antd";

const CourseCard: React.FC = () => {
  const navigate = useNavigate();
  const [searchKeyword] = useState<string>("");

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      category_id: "",
      status: "",
      is_delete: false,
    }),
    [searchKeyword]
  );

  const pageInfo = useMemo(
    () => ({
      pageNum: 1,
      pageSize: 10,
    }),
    []
  );

  const dataTransfer: DataTransfer = useMemo(
    () => ({
      searchCondition,
      pageInfo,
    }),
    [searchCondition, pageInfo]
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
          className="h-auto w-80 rounded-md bg-slate-200 transition-transform duration-300 hover:scale-105 hover:bg-slate-300"
          onClick={() => navigate(`/detail/${item._id}`)}
        >
          <div className="p-4">
            <div>
              <img
                src={item.image_url || "default-image-url"}
                alt={item.name}
                className="rounded-md"
                style={{ width: "300px", height: "200px", objectFit: "contain" }} // Ensure image content fits
              />
            </div>
            <h3 className="mt-3 cursor-pointer font-semibold">{item.name}</h3>
            <div className="my-2">
              <span className="text-xs font-light">{item.category_name}</span>
            </div>
            <Rate disabled value={item.average_rating} />{" "}
            <span className="ml-2 text-sm font-medium">
              {item.average_rating}
            </span>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs">
                By{" "}
                <span className="text-xs font-semibold">
                  {item.instructor_name || "Unknown Instructor"}
                </span>
              </p>
              <i className="fa-solid fa-cart-plus cursor-pointer hover:text-red-500"></i>
              <span>${item.price}</span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default CourseCard;
