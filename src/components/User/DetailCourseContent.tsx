import { useParams } from "react-router-dom";
import CourseBox from "../Course/CourseBox";
import { useState } from "react";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";
import CourseSubTab from "../Course/CourseSubTab";

const DetailCourseContent = () => {
  const { _id } = useParams<{ _id: string }>();
  const [activeTab, setActiveTab] = useState<string>("about");

  // Fetch course details using custom hook
  const { course, error } = useCourseDetailClient(_id as string);

  if (error) return <p>Error: {error}</p>;

  // Ensure _id is not undefined before rendering CourseSubTab
  if (!_id) {
    return <p>Course ID is missing</p>;
  }

  return (
    <div>
      <CourseBox _id={_id} />
      {course && (
        <CourseSubTab
          _id={_id}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelectedCourse={() => {}}
          content={course?.content ?? ""}
          sessions={course.session_list ?? []}
        />
      )}
    </div>
  );
};

export default DetailCourseContent;
