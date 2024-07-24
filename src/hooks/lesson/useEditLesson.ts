import { useState } from "react";
import { editLessonAPI } from "../../services/lessonService";
import { message } from "antd";
import { Lesson } from "../../models/Lesson";

const useEditLesson = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const editLesson = async (
    lessonId: string,
    lessonData: Lesson,
  ) => {
    try {
      setLoading(true);
      await editLessonAPI(lessonId, lessonData);
      message.success("Lesson updated successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to update lesson");
    } finally {
      setLoading(false);
    }
  };

  return { editLesson, loading };
};

export default useEditLesson;
