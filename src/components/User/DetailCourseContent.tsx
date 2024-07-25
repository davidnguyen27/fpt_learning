import { useParams } from "react-router-dom";
import CourseBox from "../Course/CourseBox";
import CourseSubTab from "../Course/CourseSubTab";
import { useState } from "react";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";

const DetailCourseContent = () => {
  const { _id } = useParams();
  const [activeTab, setActiveTab] = useState<string>("about");

  const { course } = useCourseDetailClient(_id as string);

  return (
    <div>
      {_id && <CourseBox _id={_id} />}
      <CourseSubTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectedCourse={() => {}}
        sessions={course?.session_list ?? []}
      />
    </div>
  );
};

export default DetailCourseContent;
