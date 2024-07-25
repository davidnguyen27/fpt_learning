import { useState } from "react";
import StudentCourseBox from "../Student/StudentCourseBox";
import CourseSubTab from "../Course/CourseSubTab";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";
import { useParams } from "react-router-dom";

const StudentDetailCourseContent = () => {
  const { _id } = useParams<{ _id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const { course } = useCourseDetailClient(_id as string);

  return (
    <div className="p-3 m-3 bg-gray-300 rounded-md">
      <div className="p-1 bg-gray-100 rounded-md">
      <StudentCourseBox
        courseData={{
          title: "Course Tittle",
          description: "Course Description",
        }}
      />
      <CourseSubTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectedCourse={() => {}}
        sessions={course?.session_list ?? []}
      />
    </div>
    </div>
  );
};

export default StudentDetailCourseContent;
