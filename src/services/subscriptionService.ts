import { APILink } from "../const/linkAPI";
import { Subscription, DataTransfer } from "../models/Subscription";
import { axiosInstance } from "./axiosInstance";

export const createUpdateSubscriptionAPI = async (
  instructor_id: string,
  createUpdateData: Partial<Subscription>,
) => {
  try {
    const response = await axiosInstance.post(`${APILink}/api/subscription`, {
      ...createUpdateData,
      instructor_id: instructor_id,
    });
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
    const res = await axiosInstance.post(
      `${APILink}/api/subscription/search-for-subscriber`,
      dataTransfer,
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
    const res = await axiosInstance.post(
      `${APILink}/api/subscription/search-for-instructor`,
      dataTransfer,
    );
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
