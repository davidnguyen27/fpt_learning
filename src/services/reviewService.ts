import { DataTransfer, Review, ReviewSearchResponse } from "../models/Review";
import { axiosInstance } from "./axiosInstance";

export const getReviewsAPI = async (
  dataTransfer: DataTransfer,
): Promise<ReviewSearchResponse> => {
  try {
    const res = await axiosInstance.post("/api/review/search", dataTransfer);
    const data: ReviewSearchResponse = res.data;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createReviewAPI = async (reviewData: Partial<Review>) => {
  try {
    const res = await axiosInstance.post('/api/review', reviewData);
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
      `/api/review/${reviewId}`,
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
    const res = await axiosInstance.delete(`/api/review/${reviewId}`);
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
      '/api/review/search',
      dataTransfer,
    );
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
