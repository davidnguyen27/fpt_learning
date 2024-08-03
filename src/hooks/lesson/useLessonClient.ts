import { useState, useEffect } from "react";
import { Lesson } from "../../models/Lesson";
import { getLessonAPI } from "../../services/lessonService";

const useLessonClient = (lessonId: string) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonData = await getLessonAPI(lessonId);
        setLesson(lessonData);
      } catch (err) {
        setError("Failed to fetch lesson data.");
      }
    };

    if (lessonId) {
      fetchLesson();
    }

    if (!lessonId) console.log("Cannot get lessonId");
  }, [lessonId]);

  return { lesson, error };
};

export default useLessonClient;
