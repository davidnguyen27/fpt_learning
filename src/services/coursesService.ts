import { Course, CourseClient, DataTransfer } from "../models/Course";
import { Subscription } from "../models/Subscription";
import { axiosInstance } from "./axiosInstance"; // Use axiosInstance

export const getCoursesAPI = async (dataTransfer: DataTransfer) => {
  try {
    const res = await axiosInstance.post("/api/course/search", dataTransfer);
    return res.data.data.pageData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const getCourseAPI = async (courseId: string) => {
  try {
    const res = await axiosInstance.get(`/api/course/${courseId}`);
    const courseData: Course = res.data.data;
    if (!courseData) throw new Error("Not found course");
    return courseData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const createCourseAPI = async (courseData: Partial<Course>) => {
  try {
    const res = await axiosInstance.post("/api/course", courseData);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const editCourseAPI = async (
  courseId: string,
  courseData: Partial<Course>,
) => {
  try {
    const res = await axiosInstance.put(
      `/api/course/${courseId}`,
      courseData,
    );
    return { ...res.data.data, _id: courseId };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const deleteCourseAPI = async (courseId: string) => {
  try {
    const res = await axiosInstance.delete(`/api/course/${courseId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCategoriesAPI = async (
  keyword: string,
  pageNum: number,
  pageSize: number,
  is_delete: boolean,
) => {
  try {
    const res = await axiosInstance.post("/api/category/search", {
      searchCondition: { keyword, is_delete },
      pageInfo: { pageNum, pageSize },
    });

    return res.data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(
      error.message || "An error occurred while fetching categories",
    );
  }
};

export const toggleCourseStatus = async (
  course_id: string,
  new_status: string,
  comment: string = "",
): Promise<void> => {
  try {
    await axiosInstance.put("/api/course/change-status", {
      course_id,
      new_status,
      comment,
    });
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const getCoursesClientAPI = async (
  dataTransfer: DataTransfer,
): Promise<CourseClient[]> => {
  try {
    const res = await axiosInstance.post(
      "/api/client/course/search",
      dataTransfer,
    );
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getDetailClientAPI = async (_id: string) => {
  try {
    const response = await axiosInstance.get(`/api/client/course/${_id}`);
    return response.data.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const createOrUpdateSubscription = async (
  instructor_id: string,
  condition: boolean,
) => {
  const is_subscribed = condition;

  try {
    const response = await axiosInstance.post<Subscription>(
      "/api/subscription",
      {
        instructor_id,
        is_subscribed,
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};
