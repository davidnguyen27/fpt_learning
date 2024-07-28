import axios from "axios";
import { Purchase, DataTransfer } from "../models/Purchase";
import { APILink } from "../const/linkAPI";

export const getItemsAll = async (
    dataTransfer: DataTransfer,
  ): Promise<Purchase[]> => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(
        `${APILink}/api/purchase/search`,
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

export const getItemsByInstructor = async (
    dataTransfer: DataTransfer,
  ): Promise<Purchase[]> => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(
        `${APILink}/api/purchase/search-for-instructor`,
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

  export const getItemsByStudent = async (
    dataTransfer: DataTransfer,
  ): Promise<Purchase[]> => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      const res = await axios.post(
        `${APILink}/api/purchase/search-for-student`,
        dataTransfer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
  
      // Check if response data is in the expected format
      if (res.data.success) {
        return res.data.data.pageData;
      } else {
        throw new Error("Failed to fetch data: " + res.data.message);
      }
    } catch (error: any) {
      // Improve error handling
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
  };