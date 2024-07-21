import { useState } from "react";
import { message } from "antd";
import { deleteCourseAPI } from "../../services/courseManageService";

const useDeleteCourse = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCourse = async (courseId: string) => {
    try {
      setLoading(true);
      await deleteCourseAPI(courseId);
      message.success("Course deleted successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  return { deleteCourse, loading };
};

export default useDeleteCourse;
