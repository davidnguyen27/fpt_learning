import { useEffect, useState, useCallback } from "react";
import { getCoursesClientAPI } from "../../services/coursesService";
import { CourseClient, DataTransfer } from "../../models/Course";

const useCourseDataClient = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CourseClient[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const courses = await getCoursesClientAPI(dataTransfer);
      setData(courses);
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

export default useCourseDataClient;
