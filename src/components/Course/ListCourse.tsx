import React from "react";
import CourseCard from "./CourseCard";
import "../../styles/listCourse.css";

interface ListCourseProps {
  category_id: string;
}

const ListCourse: React.FC<ListCourseProps> = ({ category_id }) => {
  return (
    <div className="course-list">
      <CourseCard category_id={category_id} />
    </div>
  );
};

export default React.memo(ListCourse);
