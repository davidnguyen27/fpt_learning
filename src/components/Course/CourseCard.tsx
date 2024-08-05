import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTransfer } from "../../models/Course";
import useCourseDataClient from "../../hooks/course/useCourseDataClient";
import { Rate, Button, Tag, Spin } from "antd";
import "../../styles/courseCard.css";
import { LoadingOutlined } from "@ant-design/icons";

interface CourseCardProps {
  category_id: string;
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
  const { category_id } = props;
  const navigate = useNavigate();
  const searchKeyword = "";

  const searchCondition = useMemo(
    () => ({
      keyword: searchKeyword,
      category_id,
      status: "",
      is_delete: false,
    }),
    [category_id],
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

  if (loading)
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {courses.map((item: any) => (
        <article key={item._id} className="course-card">
          <div className="course-card-content">
            <img
              src={item.image_url || "default-image-url"}
              alt={item.name}
              className="course-card-image"
              onClick={() => navigate(`/detail/course/${item._id}`)}
            />
            <h3
              className="course-card-title"
              onClick={() => navigate(`/detail/course/${item._id}`)}
            >
              {item.name}
            </h3>
            <div className="course-card-category">{item.category_name}</div>
            <div className="course-card-rating">
              <Rate
                disabled
                allowHalf
                value={Math.round(item.average_rating * 10) / 10}
              />
              <span className="course-card-rating-value">
                {Math.round(item.average_rating * 10) / 10}
              </span>
              <span className="ml-2 font-medium">
                ({item.review_count} reviews)
              </span>
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
                ) : item.price === 0 ? (
                  <Tag className="course-card-free-tag">Free</Tag>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-plus course-card-cart-icon"></i>
                    {item.discount ? (
                      <>
                        <span className="course-card-price-original">
                          ${item.price}
                        </span>
                        <span className="course-card-price-discounted">
                          ${item.price_paid}
                        </span>
                      </>
                    ) : (
                      <span className="course-card-price">${item.price}</span>
                    )}
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

export default React.memo(CourseCard);
