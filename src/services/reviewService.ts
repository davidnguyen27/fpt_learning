import { APILink } from "../const/linkAPI";
import { DataTransfer, Review } from "../models/Review";
import { axiosInstance } from "./axiosInstance";

export const getReviewsAPI = async (dataTransfer: DataTransfer) => {
  try {
    const res = await axiosInstance.post(
      `${APILink}/api/review/search`,
      dataTransfer,
    );
    return res.data.data.pageData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const createReviewAPI = async (reviewData: Partial<Review>) => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/review`, reviewData);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const editReviewAPI = async (
  reviewId: string,
  reviewData: Partial<Review>,
) => {
  try {
    const res = await axiosInstance.put(
      `${APILink}/api/review/${reviewId}`,
      reviewData,
    );
    return { ...res.data.data, _id: reviewId };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  }
};

export const deleteReviewAPI = async (reviewId: string) => {
  try {
    const res = await axiosInstance.delete(`${APILink}/api/review/${reviewId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getReviewsClientAPI = async (
  dataTransfer: DataTransfer,
): Promise<Review[]> => {
  try {
    const res = await axiosInstance.post(
      `${APILink}/api/review/search`,
      dataTransfer,
    );
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
