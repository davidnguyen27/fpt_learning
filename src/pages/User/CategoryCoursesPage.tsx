import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import useCourseDataClient from "../../hooks/course/useCourseDataClient";
import { CourseClient, DataTransfer } from "../../models/Course";
import { Spin, Rate, Button, Tag } from "antd";
import "../../styles/courseCard.css";

const CategoryCoursesPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const dataTransfer: DataTransfer = useMemo(
    () => ({
      searchCondition: {
        category_id: categoryId || "",
        keyword: "",
        status: "",
        is_delete: false,
      },
      pageInfo: {
        pageNum: currentPage,
        pageSize: pageSize,
      },
    }),
    [categoryId, currentPage, pageSize],
  );

  const {
    data: courses,
    loading,
    error,
    refetchData,
  } = useCourseDataClient(dataTransfer);

  useEffect(() => {
    setCurrentPage(1);
    refetchData();
  }, [categoryId, refetchData]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto flex h-64 items-center justify-center px-4 py-8">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-3xl font-bold text-red-500">Error</h1>
          <p>{error}</p>
        </div>
      </MainLayout>
    );
  }

  const categoryName =
    courses && courses.length > 0
      ? courses[0].category_name
      : "Unknown Category";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">
          Courses in {categoryName} Category:
        </h1>
        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {courses.map((course: CourseClient) => (
              <article key={course._id} className="course-card">
                <div className="course-card-content">
                  <img
                    src={course.image_url || "default-image-url"}
                    alt={course.name}
                    className="course-card-image"
                    onClick={() => navigate(`/detail/${course._id}`)}
                  />
                  <h3
                    className="course-card-title"
                    onClick={() => navigate(`/detail/${course._id}`)}
                  >
                    {course.name}
                  </h3>
                  <div className="course-card-category">
                    {course.category_name}
                  </div>
                  <div className="course-card-rating">
                    <Rate disabled allowHalf value={course.average_rating} />
                    <span className="course-card-rating-value">
                      {course.average_rating}
                    </span>
                    <span className="ml-2 font-medium">
                      ({course.review_count} reviews)
                    </span>
                  </div>
                  <div className="course-card-footer">
                    <p className="course-card-instructor">
                      By{" "}
                      <span className="course-card-instructor-name">
                        {course.instructor_name || "Unknown Instructor"}
                      </span>
                    </p>
                    <div className="course-card-actions">
                      {course.is_purchased ? (
                        <Button type="primary" className="course-card-button">
                          Learn Now
                        </Button>
                      ) : course.price === 0 ? (
                        <Tag className="course-card-free-tag">Free</Tag>
                      ) : (
                        <>
                          <i className="fa-solid fa-cart-plus course-card-cart-icon"></i>
                          {course.discount ? (
                            <>
                              <span className="course-card-price-original">
                                ${course.price}
                              </span>
                              <span className="course-card-price-discounted">
                                ${course.price_paid}
                              </span>
                            </>
                          ) : (
                            <span className="course-card-price">
                              ${course.price}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No courses found for this category.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryCoursesPage;
