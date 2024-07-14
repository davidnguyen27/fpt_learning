import axios from "axios";
import { Course, DataTransfer } from "../models/Course";
import { APILink } from "../const/linkAPI";

export const getCoursesAPI = async (
  dataTransfer: DataTransfer,
): Promise<Course["pageData"]> => {
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
    throw new Error(error.message);
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
