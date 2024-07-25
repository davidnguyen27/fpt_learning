import { useEffect, useState } from "react";
import { getLessonsAPI } from "../../services/lessonService";
import { DataTransfer } from "../../models/Lesson";

interface DataType {
  key: string;
  name: string;
  course_name: string;
  session_name: string;
  lesson_type: string;
  full_time: number;
  position_order: number;
}

const useLessonsData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLessons();
  }, [dataTransfer]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const lessons = await getLessonsAPI(dataTransfer);
      const groupedData: DataType[] = lessons.map((lesson) => ({
        key: lesson._id,
        session_name: lesson.session_name,
        course_name: lesson.course_name,
        position_order: lesson.position_order,
        lesson_type: lesson.lesson_type,
        name: lesson.name,
        full_time: lesson.full_time,
      }));
      setData(groupedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch lessons.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetchData: fetchLessons };
};

export default useLessonsData;