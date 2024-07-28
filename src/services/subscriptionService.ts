import axios from "axios";
import { APILink } from "../const/linkAPI";
import { Subscription, DataTransfer } from "../models/Subscription";

export const createUpdateSubscriptionAPI = async (
    instructor_id: string,
    createUpdateData: Partial<Subscription>
) => {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Cannot get token!");
    
        const response = await axios.post(
            `${APILink}/api/subscription`,
            {
                ...createUpdateData,
                instructor_id: instructor_id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    
        const createUpdateItem: Subscription = response.data.data;
        return createUpdateItem;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

export const getSubscriptionBySubscriberAPI = async (
    _id: string,
    dataTransfer: DataTransfer,
  ): Promise<Subscription[]> => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(
        `${APILink}/api/subscription/search-for-subscriber`,
        dataTransfer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data.pageData;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  export const getSubscriptionByInstructorAPI = async (
    _id: string,
    dataTransfer: DataTransfer,
  ): Promise<Subscription[]> => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(
        `${APILink}/api/subscription/search-for-instructor`,
        dataTransfer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data.pageData;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };