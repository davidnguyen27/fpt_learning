import { useEffect, useState } from "react";
import { getLessonsAPI } from "../../services/lessonService";
import { DataTransfer, Lesson, LessonSearchResponse } from "../../models/Lesson";

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
  const [totalItems, setTotalItems] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLessons();
  }, [dataTransfer]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response: LessonSearchResponse = await getLessonsAPI(dataTransfer);

      const lessons = response.data.pageData.map((lesson: Lesson) => ({
        key: lesson._id,
        session_name: lesson.session_name,
        course_name: lesson.course_name,
        position_order: lesson.position_order,
        lesson_type: lesson.lesson_type,
        name: lesson.name,
        full_time: lesson.full_time,
      }));

      setData(lessons);
      setTotalItems(response.data.pageInfo.totalItems);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch lessons.");
    } finally {
      setLoading(false);
    }
  };

  return { data, totalItems, loading, error, refetchData: fetchLessons };
};

export default useLessonsData;
