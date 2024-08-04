import { useParams } from "react-router-dom";
import CourseBox from "../Course/CourseBox";
import { useState } from "react";
import useCourseDetailClient from "../../hooks/course/useCourseDetailClient";
import CourseSubTab from "../Course/CourseSubTab";
import { Spin } from "antd";

const DetailCourseContent = () => {
  const { _id } = useParams<{ _id: string }>();
  const [activeTab, setActiveTab] = useState<string>("about");
  const { course, loading } = useCourseDetailClient(_id as string);

  if (loading) {
    return (
      <div className="container mx-auto flex h-64 items-center justify-center px-4 py-8">
        <Spin size="large" />
      </div>
    );
  }

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
