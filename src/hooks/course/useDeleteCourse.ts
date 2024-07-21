import { useState } from "react";
import { deleteCourseAPI } from "../../services/coursesService";
import { message } from "antd";

const useDeleteCourse = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCourse = async (courseId: string) => {
    try {
      setLoading(true);
      await deleteCourseAPI(courseId);
      message.success("Course deleted successfully");
      onSuccess(); // Call onSuccess to refresh the lessons list
    } catch (error) {
      message.error("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  return { deleteCourse, loading };
};

export default useDeleteCourse;
