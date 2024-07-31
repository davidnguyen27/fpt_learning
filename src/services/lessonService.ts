import axios from "axios";
import { Lesson, DataTransfer } from "../models/Lesson";
import { APILink } from "../const/linkAPI";

export const getLessonsAPI = async (
  dataTransfer: DataTransfer,
): Promise<Lesson[]> => {
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

    const lessonData: Lesson = res.data.data;
    if (!lessonData) throw new Error("Not found lessonData");

    return lessonData;
  } catch (error: any) {
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch lesson data");
  }
};

export const createLessonAPI = async (
  lessonData: Partial<Lesson>,
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
  lessonData: Partial<Lesson>,
): Promise<Lesson> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) throw new Error("Cannot get token!");

    // Ensure user_id is included in the data to be sent
    const updatedLessonData = {
      ...lessonData,
      user_id: lessonData.user_id, // Use user_id from lessonData
    };

    const res = await axios.put(
      `${APILink}/api/lesson/${lessonId}`,
      updatedLessonData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { ...res.data.data, _id: lessonId };
  } catch (error: any) {
    // Enhanced error logging
    if (error.response) {
      console.error("API Request Error:", error.message);
    } else if (error.request) {
      console.error("API No Response Received:", error.request);
    } else {
      
    }
    throw new Error(error.response?.data?.message || error.message || "An error occurred while updating the lesson");
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

export const getCoursesAPI = async (
  keyword: string,
  pageNum: number,
  pageSize: number,
  is_delete: boolean,
) => {
  try {
    const token = sessionStorage.getItem("token");
    console.log("token", token);
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(
      `${APILink}/api/course/search`,
      {
        searchCondition: { keyword, is_delete },
        pageInfo: { pageNum, pageSize },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log("res", res.data);
    return res.data;

  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(error.message || "An error occurred while fetching courses");
  }
};

export const getSessionsAPI = async (
  keyword: string,
  pageNum: number,
  pageSize: number,
  is_delete: boolean,
) => {
  try {
    const token = sessionStorage.getItem("token");
    console.log("token", token);
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(
      `${APILink}/api/session/search`,
      {
        searchCondition: { keyword, is_delete },
        pageInfo: { pageNum, pageSize },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log("res", res.data);
    return res.data;

  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(error.message || "An error occurred while fetching sessions");
  }
};