import axios from "axios";
import { Course, DataTransfer } from "../models/Course";
import { APILink } from "../const/linkAPI";

export const getCoursesAPI = async (dataTransfer: DataTransfer) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/course/search`, dataTransfer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.pageData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const getCourseAPI = async (courseId: string) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.get(`${APILink}/api/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/course`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.put(
      `${APILink}/api/course/${courseId}`,
      courseData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.delete(`${APILink}/api/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(
      `${APILink}/api/category/search`,
      {
        searchCondition: { keyword, is_delete },
        pageInfo: { pageNum, pageSize },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(
      error.message || "An error occurred while fetching categories",
    );
  }
};

//-------------------------------- Change Status Course (Instructor) ---------------------------------------
export const toggleCourseStatus = async (
  course_id: string,
  new_status: string,
  comment: string = "",
): Promise<void> => {
  const token = sessionStorage.getItem("token");
  const url = `${APILink}/api/course/change-status`;

  try {
    await axios.put(
      url,
      { course_id, new_status, comment },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const getCoursesClientAPI = async (
  dataTransfer: DataTransfer,
): Promise<Course[]> => {
  try {
    const res = await axios.post(
      `${APILink}/api/client/course/search`,
      dataTransfer,
    );
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
