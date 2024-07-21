import { useEffect, useState } from "react";
import { getLessonsAPI } from "../../services/lessonService";
import { DataTransfer } from "../../models/Lesson";

interface DataType {
  key: string;
  session_id: string;
  course_id: string;
  position_order: number;
  lesson_type: string;
  description: string;
  video_url: string;
  image_url: string;
  name: string;
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
        course_id: lesson.course_id,
        position_order: lesson.position_order,
        lesson_type: lesson.lesson_type,
        video_url: lesson.video_url,
        image_url: lesson.image_url,
        description: lesson.description,
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
