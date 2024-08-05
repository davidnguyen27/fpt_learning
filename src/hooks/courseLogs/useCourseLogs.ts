import { useState, useEffect } from "react";
import { getCourseLogsAPI } from "../../services/courseLogService";
import { CourseLogs, DataTransfer } from "../../models/CourseLog"; 

const useCourseLogs = (courseId: string) => {
  const [logs, setLogs] = useState<CourseLogs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const dataTransfer: DataTransfer = {
          searchCondition: {
            course_id: courseId,
            keyword: "", // Giá trị mặc định, điều chỉnh nếu cần
            category_id: "", // Giá trị mặc định, điều chỉnh nếu cần
            status: "", // Giá trị mặc định, điều chỉnh nếu cần
            is_delete: false, // Giá trị mặc định, điều chỉnh nếu cần
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        };

        const response = await getCourseLogsAPI(dataTransfer);
        setLogs(response.pageData); // Lấy dữ liệu từ response.data.pageData
      } catch (err) {
        setError("Failed to fetch course logs");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchLogs();
    }
  }, [courseId]);

  return { logs, loading, error };
};

export default useCourseLogs;
