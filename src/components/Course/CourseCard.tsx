import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTransfer } from "../../models/Course";
import useCourseDataClient from "../../hooks/course/useCourseDataClient";
import { Rate, Button } from "antd";
import "../../styles/courseCard.css";

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
    [searchKeyword, category_id]
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
          className="course-card"
          onClick={() => navigate(`/detail/${item._id}`)}
        >
          <div className="course-card-content">
            <img
              src={item.image_url || "default-image-url"}
              alt={item.name}
              className="course-card-image"
            />
            <h3 className="course-card-title">{item.name}</h3>
            <div className="course-card-category">{item.category_name}</div>
            <div className="course-card-rating">
              <Rate disabled value={item.average_rating} />
              <span className="course-card-rating-value">{item.average_rating}</span>
            </div>
            <div className="course-card-footer">
              <p className="course-card-instructor">
                By{" "}
                <span className="course-card-instructor-name">
                  {item.instructor_name || "Unknown Instructor"}
                </span>
              </p>
              <div className="course-card-actions">
                {item.is_purchased ? (
                  <Button type="primary" className="course-card-button">
                    Learn Now
                  </Button>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-plus course-card-cart-icon"></i>
                    <span className="course-card-price">${item.price}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default CourseCard;
