import { useEffect, useState, useCallback } from "react";
import { getCoursesAPI } from "../../services/coursesService";
import { DataTransfer } from "../../models/Course";

interface DataType {
  key: string;
  category_id: string;
  name: string;
  description: string;
  status: string;
  user_id: string;
  video_url: string | null;
  image_url: string | null;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
}

const useCourseData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const courses = await getCoursesAPI(dataTransfer);
      const groupedData: DataType[] = courses.map((course) => ({
        key: course._id,
        name: course.name,
        description: course.description,
        category_id: course.category_id,
        user_id: course.user_id,
        video_url: course.video_url,
        image_url: course.image_url,
        status: course.status,
        price: course.price,
        discount: course.discount,
        created_at: course.created_at,
        updated_at: course.updated_at,
      }));
      setData(groupedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  }, [dataTransfer]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { data, loading, error, refetchData: fetchCourses };
};

export default useCourseData;
