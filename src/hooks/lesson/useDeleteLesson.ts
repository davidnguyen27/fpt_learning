import { useState } from "react";
import { deleteLessonAPI } from "../../services/lessonService";
import { message } from "antd";

const useDeleteLesson = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteLesson = async (lessonId: string) => {
    try {
      setLoading(true);
      await deleteLessonAPI(lessonId);
      message.success("Lesson deleted successfully");
      onSuccess(); // Call onSuccess to refresh the lessons list
    } catch (error) {
      message.error("Failed to delete lesson");
    } finally {
      setLoading(false);
    }
  };

  return { deleteLesson, loading };
};

export default useDeleteLesson;
