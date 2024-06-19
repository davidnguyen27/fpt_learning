import { useState } from "react";
import StudentCourseBox from "../Student/StudentCourseBox";
import CourseSubTab from "../Course/CourseSubTab";

const StudentDetailCourseContent = () => {
  const [activeTab, setActiveTab] = useState("about");
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
        courseData={{
          content: ["Course Content 1", "Course Content 2"],
        }}
      />
    </div>
    </div>
  );
};

export default StudentDetailCourseContent;
