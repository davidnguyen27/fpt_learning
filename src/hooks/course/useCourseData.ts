import { useEffect, useState, useCallback } from "react";
import { getCoursesAPI } from "../../services/coursesService";
import { Course, DataTransfer } from "../../models/Course";

const useCourseData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const courses = await getCoursesAPI(dataTransfer);
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
  }, []);

  return { data, loading, error, refetchData: fetchCourses };
};

export default useCourseData;
