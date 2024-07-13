import axios from "axios";
import { Lesson } from "../models/Lesson";
import { APILink } from "../const/linkAPI";

export const getLessonsAPI = async (
  lessonData: Lesson,
): Promise<Lesson["data"]["pageData"]> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/lesson/search`, lessonData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
