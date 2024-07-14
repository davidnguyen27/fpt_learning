import { useEffect, useState } from "react";
import { getLessonsAPI } from "../../services/lessonService";
import { DataTransfer } from "../../models/Lesson";

interface DataType {
  session_id: string;
  key: string;
  session_name: string;
  course_name: string;
  position_order: number;
  name: string;
  video_url: string;
  full_time: number;
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
        session_id: lesson.session_id,
        session_name: lesson.session_name,
        course_name: lesson.course_name,
        position_order: lesson.position_order,
        name: lesson.name,
        video_url: lesson.video_url,
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
