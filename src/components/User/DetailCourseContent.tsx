import { useState } from "react";
import CourseBox from "../Course/CourseBox";
import CourseSubTab from "../Course/CourseSubTab";

const DetailCourseContent = () => {
  const [activeTab, setActiveTab] = useState("about");
  return (
    <div>
      <CourseBox
        courseData={{
          title: "The Web Developer Bootcamp",
          description:
            "The only course you need to learn web development - HTML, CSS, JS, Node, and More!",
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
