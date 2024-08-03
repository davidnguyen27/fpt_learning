import { APILink } from "../const/linkAPI";
import { DataTransfer, Session } from "../models/Session";
import { axiosInstance } from "./axiosInstance";

//--------------------------------- Get Session (Admin/ Instructor) ---------------------------------
export const getSessionsAPI = async (
  dataTransfer: DataTransfer,
): Promise<Session[]> => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/session/search`, dataTransfer);
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------

//--------------------------------- Get Session Detail (Admin/ Instructor) -------------------------------
  export const getSessionAPI = async (sessionId: string) => {
    try {
      const res = await axiosInstance.get(`${APILink}/api/session/${sessionId}`);
      const sessionData: Session = res.data.data;
      if (!sessionData) throw new Error("Not found sessionData");
      return sessionData;
    } catch (error: any) {
      console.error("API fetch error:", error);
      throw new Error("Failed to fetch session data");
    }
  };

  //--------------------------------- Create Session (Instructor) -------------------------------------------
  export const createSessionAPI = async (
    sessionData: Partial<Session>,
  ) => {
    try {
      const res = await axiosInstance.post(`${APILink}/api/session`, sessionData);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  
//-------------------------------- Update Session (Instructor) ---------------------------------------
export const editSessionAPI = async (
  sessionId: string,
  sessionData: Partial<Session>,
): Promise<Session> => {
  try {
    const res = await axiosInstance.put(`${APILink}/api/session/${sessionId}`, sessionData);
    return { ...res.data.data, _id: sessionId };
  } catch (error: any) {
    throw new Error(error);
  }
};
  //--------------------------------- Delete User (Admin) -----------------------------------------
  export const deleteSessionAPI = async (sessionId: string) => {
    try {
      const res = await axiosInstance.delete(`${APILink}/api/session/${sessionId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  //-----------------------------------------------------------------------------------------------

  export const getCoursesAPI = async (
    keyword: string,
    pageNum: number,
    pageSize: number,
    is_delete: boolean,
  ) => {
    try {
      const res = await axiosInstance.post(
        `${APILink}/api/course/search`,
        {
          searchCondition: { keyword, is_delete },
          pageInfo: { pageNum, pageSize },
        });
      console.log("res", res.data);
      return res.data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw new Error(error.message || "An error occurred while fetching courses");
    }
  };
  