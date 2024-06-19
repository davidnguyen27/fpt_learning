import { useState } from "react";
import CourseBox from "../Course/CourseBox";
import CourseSubTab from "../Course/CourseSubTab";

const DetailCourseContent = () => {
  const [activeTab, setActiveTab] = useState("about");
  return (
    <div>
      <CourseBox
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
  );
};

export default DetailCourseContent;
