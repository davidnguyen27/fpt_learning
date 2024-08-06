import { DataTransfer, PayoutSearchResponse } from "../models/Payout";
import { axiosInstance } from "./axiosInstance";

export const createPayoutAPI = async (
  instructor_id: string,
  transactions: { purchase_id: string }[],
) => {
  const payload = {
    instructor_id,
    transactions,
  };

  try {
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.post("/api/payout", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const getPayoutsAPI = async (dataTransfer: DataTransfer): Promise<PayoutSearchResponse> => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.post<PayoutSearchResponse>(
      "/api/payout/search",
      dataTransfer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
  }
};

export const requestPayoutAPI = async (
  payoutId: string,
  status: string,
  comment: string,
) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.put(
      `/api/payout/update-status/${payoutId}`,
      {
        status,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
