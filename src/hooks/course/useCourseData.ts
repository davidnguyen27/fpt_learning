import { useEffect, useState, useCallback } from "react";
import { getCoursesAPI } from "../../services/coursesService";
import { Course, DataTransfer, CourseSearchResponse } from "../../models/Course";

const useCourseData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Course[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // New state for total items
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response: CourseSearchResponse = await getCoursesAPI(dataTransfer);
      setData(response.data.pageData); // Set courses data
      setTotalItems(response.data.pageInfo.totalItems); // Set total items from response
      setError(null);
    } catch (err) {
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  }, [dataTransfer]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]); // Update the dependency to fetchCourses to avoid stale closures

  return { data, totalItems, loading, error, refetchData: fetchCourses };
};

export default useCourseData;
