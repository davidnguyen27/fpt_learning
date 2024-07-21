import { useState } from "react";
import { editCourseAPI } from "../../services/coursesService";
import { message } from "antd";
import { Course } from "../../models/Course";

const useEditCourse = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const editCourse = async (courseId: string, courseData: Course) => {
    try {
      setLoading(true);
      // Ensure price and discount are numbers
      courseData.price = Number(courseData.price);
      courseData.discount = Number(courseData.discount);
      await editCourseAPI(courseId, courseData);
      message.success("Course updated successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return { editCourse, loading };
};

export default useEditCourse;
