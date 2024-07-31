import axios from "axios";
import { APILink } from "../const/linkAPI";
import { DataTransfer, Review } from "../models/Review";

export const getReviewsAPI = async (dataTransfer: DataTransfer) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(`${APILink}/api/review/search`, dataTransfer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data.pageData;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
      }
    }
  };

  export const createReviewAPI = async (reviewData: Partial<Review>) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(`${APILink}/api/review`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.put(
        `${APILink}/api/review/${reviewId}`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
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
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.delete(`${APILink}/api/review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  export const getReviewsClientAPI = async (
    dataTransfer: DataTransfer,
  ): Promise<Review[]> => {
    try {
      const res = await axios.post(
        `${APILink}/api/review/search`,
        dataTransfer,
      );
      return res.data.data.pageData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };