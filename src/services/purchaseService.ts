import {
  Purchase,
  DataTransfer,
  PurchaseSearchResponse,
} from "../models/Purchase";
import { axiosInstance } from "./axiosInstance";

export const getItemsAll = async (
  dataTransfer: DataTransfer,
): Promise<PurchaseSearchResponse> => {
  try {
    const res = await axiosInstance.post("/api/purchase/search", dataTransfer);
    const data: PurchaseSearchResponse = res.data;
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getItemsByInstructor = async (
  dataTransfer: DataTransfer,
): Promise<PurchaseSearchResponse> => {
  try {
    const res = await axiosInstance.post<PurchaseSearchResponse>(
      "/api/purchase/search-for-instructor",
      dataTransfer,
    );
    return res.data;
  } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
  }
};

export const getItemsByStudent = async (
  dataTransfer: DataTransfer,
): Promise<Purchase[]> => {
  try {
    const res = await axiosInstance.post(
      "/api/purchase/search-for-student",
      dataTransfer,
    );
    if (res.data.success) {
      return res.data.data.pageData;
    } else {
      throw new Error("Failed to fetch data: " + res.data.message);
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
};
