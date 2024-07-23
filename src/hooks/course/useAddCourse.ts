import { message } from "antd";
import { useState } from "react";
import { createCourseAPI } from "../../services/coursesService";

import { Course } from "../../models/Course";

const useAddCourse = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const createCourse = async (courseData: Course) => {
    try {
      setLoading(true);
      courseData.price = Number(courseData.price);
      courseData.discount = Number(courseData.discount);
      await createCourseAPI(courseData);
      message.success("Course added successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createCourse, loading };
};

export default useAddCourse;
