import { useEffect, useState } from "react";
import { CourseDetail } from "../../models/Course";
import { getDetailClientAPI } from "../../services/coursesService";

const useCourseDetailClient = (courseId: string) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      setLoading(true);
      try {
        const courseDetail = await getDetailClientAPI(courseId);
        setCourse(courseDetail);
      } catch (err) {
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  return { course, loading, error, setCourse };
};

export default useCourseDetailClient;
