import { message } from "antd";
import { useState } from "react";
import { createLessonAPI } from "../../services/lessonService";
import { Lesson } from "../../models/Lesson";

const useAddLesson = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const createLesson = async (lessonData: Lesson["pageData"]) => {
    try {
      setLoading(true);
      await createLessonAPI(lessonData);
      message.success("Lesson added successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to add lesson!");
    } finally {
      setLoading(false);
    }
  };

  return { createLesson, loading };
};

export default useAddLesson;
