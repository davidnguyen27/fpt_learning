import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTransfer } from "../../models/Course";
import useCourseDataClient from "../../hooks/course/useCourseDataClient";

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
    [searchKeyword],
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
      {courses.map((item) => (
        <article
          key={item._id}
          className="h-auto w-auto cursor-pointer rounded-md bg-slate-200 transition-transform duration-300 hover:scale-105 hover:bg-slate-300"
          onClick={() => navigate(`/detail/${item._id}`)}
        >
          <div className="p-4">
            <div>
              <img
                src={item.image_url || "default-image-url"}
                alt={item.name}
                className="rounded-md"
              />
            </div>
            <div className="my-3 flex justify-between">
              <div>
                <span>1M Students</span>
              </div>
              <div>
                <i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:text-amber-500"></i>
              </div>
            </div>
            <h3 className="font-semibold">{item.name}</h3>
            <div className="my-2">
              <span className="text-xs font-light">{item.category_name}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs">
                By <span className="font-medium">{item.user_name}</span>
              </p>
              <i className="fa-solid fa-cart-plus ml-14 cursor-pointer"></i>
              <span>${item.price}</span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default CourseCard;
