import { useEffect, useState, useCallback } from "react";
import { getCoursesAPI } from "../../services/coursesService";
import { DataTransfer } from "../../models/Course";

interface DataType {
  key: string;
  name: string;
  category_name: string;
  status: string;
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
        category_name: course.category_name,
        status: course.status,
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
