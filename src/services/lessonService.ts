import axios from "axios";
import { Lesson, DataTransfer } from "../models/Lesson";
import { APILink } from "../const/linkAPI";

export const getLessonsAPI = async (
  dataTransfer: DataTransfer,
): Promise<Lesson["pageData"]> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/lesson/search`, dataTransfer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getLessonAPI = async (lessonId: string) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.get(`${APILink}/api/lesson/${lessonId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const lessonData: Lesson["pageData"][number] = res.data.data;
    if (!lessonData) throw new Error("Not found lessonData");

    return lessonData;
  } catch (error: any) {
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch lesson data");
  }
};

export const createLessonAPI = async (
  lessonData: Partial<Lesson["pageData"]>,
) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/lesson`, lessonData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editLessonAPI = async (
  lessonId: string,
  lessonData: Partial<Lesson["pageData"][number]>,
): Promise<Lesson["pageData"][number]> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.put(
      `${APILink}/api/lesson/${lessonId}`,
      lessonData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { ...res.data.data, _id: lessonId };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteLessonAPI = async (lessonId: string) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.delete(`${APILink}/api/lesson/${lessonId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
