import { useState } from "react";
import { message } from "antd";
import { editCourseAPI } from "../../services/courseManageService";
import { Course } from "../../models/Course";

const useEditCourse = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const editCourse = async (
    courseId: string,
    courseData: Course["pageData"][number],
  ) => {
    try {
      setLoading(true);
      await editCourseAPI(courseId, courseData);
      message.success("Lesson updated successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to update lesson");
    } finally {
      setLoading(false);
    }
  };

  return { editCourse, loading };
};

export default useEditCourse;
