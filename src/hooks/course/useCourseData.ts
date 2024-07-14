import { useEffect, useState } from "react";
import { DataTransfer, DataType } from "../../models/Course";
import { getCoursesAPI } from "../../services/courseManageService";

const useCourseData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [dataTransfer]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const courses = await getCoursesAPI(dataTransfer);
      const groupedData: DataType[] = courses.map((course) => ({
        keyword: course._id,
        course_name: course.name,
        category_name: course.category_name,
        created_at: course.created_at,
        status: course.status,
      }));
      setData(groupedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetchData: fetchCourses };
};

export default useCourseData;
