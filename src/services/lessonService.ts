import { Lesson, DataTransfer } from "../models/Lesson";
import { APILink } from "../const/linkAPI";
import { axiosInstance } from "./axiosInstance";

export const getLessonsAPI = async (
  dataTransfer: DataTransfer,
): Promise<Lesson[]> => {
  try {
    const res = await axiosInstance.post(
      `${APILink}/api/lesson/search`,
      dataTransfer,
    );
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getLessonAPI = async (lessonId: string) => {
  try {
    const res = await axiosInstance.get(`${APILink}/api/lesson/${lessonId}`);
    const lessonData: Lesson = res.data.data;
    if (!lessonData) throw new Error("Not found lessonData");
    return lessonData;
  } catch (error: any) {
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch lesson data");
  }
};

export const createLessonAPI = async (lessonData: Partial<Lesson>) => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/lesson`, lessonData);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editLessonAPI = async (
  lessonId: string,
  lessonData: Partial<Lesson>,
): Promise<Lesson> => {
  try {
    const updatedLessonData = {
      ...lessonData,
      user_id: lessonData.user_id,
    };
    const res = await axiosInstance.put(
      `${APILink}/api/lesson/${lessonId}`,
      updatedLessonData,
    );
    return { ...res.data.data, _id: lessonId };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while updating the lesson",
    );
  }
};

export const deleteLessonAPI = async (lessonId: string) => {
  try {
    const res = await axiosInstance.delete(`${APILink}/api/lesson/${lessonId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCoursesAPI = async (
  keyword: string,
  pageNum: number,
  pageSize: number,
  is_delete: boolean,
) => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/course/search`, {
      searchCondition: { keyword, is_delete },
      pageInfo: { pageNum, pageSize },
    });
    return res.data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(
      error.message || "An error occurred while fetching courses",
    );
  }
};

export const getSessionsAPI = async (
  keyword: string,
  pageNum: number,
  pageSize: number,
  is_delete: boolean,
) => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/session/search`, {
      searchCondition: { keyword, is_delete },
      pageInfo: { pageNum, pageSize },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while fetching sessions",
    );
  }
};
