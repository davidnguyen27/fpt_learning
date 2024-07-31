import axios from "axios";
import { APILink } from "../const/linkAPI";
import { DataTransfer, Session } from "../models/Session";

//--------------------------------- Get Session (Admin/ Instructor) ---------------------------------
export const getSessionsAPI = async (
  dataTransfer: DataTransfer,
): Promise<Session[]> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/session/search`, dataTransfer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


  //-----------------------------------------------------------------------------------------------

//--------------------------------- Get Session Detail (Admin/ Instructor) -------------------------------

  export const getSessionAPI = async (sessionId: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.get(`${APILink}/api/session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
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
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(`${APILink}/api/session`, sessionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.put(
      `${APILink}/api/session/${sessionId}`,
      sessionData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { ...res.data.data, _id: sessionId };
  } catch (error: any) {
    throw new Error(error);
  }
};
  //--------------------------------- Delete User (Admin) -----------------------------------------
  export const deleteSessionAPI = async (sessionId: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.delete(`${APILink}/api/session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  