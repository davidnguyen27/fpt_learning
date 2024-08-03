import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Rate, Button, Spin } from "antd";
import useCourseDataClient from "../../hooks/course/useCourseDataClient";
import MainLayout from "../../components/Layout/MainLayout";
import { CourseClient, DataTransfer } from "../../models/Course";
import "../../styles/courseCard.css";

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 12;

  const dataTransfer: DataTransfer = useMemo(
    () => ({
      searchCondition: {
        keyword,
        category_id: "",
        status: "",
        is_delete: false,
      },
      pageInfo: {
        pageNum: currentPage,
        pageSize,
      },
    }),
    [keyword, currentPage],
  );

  const { data: courses, loading, error } = useCourseDataClient(dataTransfer);

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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Search Results for "{keyword}"
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {courses.map((course: CourseClient) => (
            <article
              key={course._id}
              className="course-card"
              onClick={() => navigate(`/detail/${course._id}`)}
            >
              <div className="course-card-content">
                <img
                  src={course.image_url || "default-image-url"}
                  alt={course.name}
                  className="course-card-image"
                />
                <h3 className="course-card-title">{course.name}</h3>
                <div className="course-card-category">
                  {course.category_name}
                </div>
                <div className="course-card-rating">
                  <Rate disabled value={course.average_rating} />
                  <span className="course-card-rating-value">
                    {course.average_rating}
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
                    ) : (
                      <>
                        <i className="fa-solid fa-cart-plus course-card-cart-icon"></i>
                        <span className="course-card-price">
                          ${course.price}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Pagination
          className="mt-8 text-center"
          current={currentPage}
          total={courses.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </MainLayout>
  );
};

export default SearchResultsPage;
