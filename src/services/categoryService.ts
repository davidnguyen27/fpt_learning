import axios from "axios";
import { APILink } from "../const/linkAPI";
import { Category } from "../models/Types";

export const createCategoryAPI = async (
  categoryData: Partial<Category["pageData"][number]>,
) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(`${APILink}/api/category`, categoryData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCategoriesAPI = async (): Promise<Category> => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(
      `${APILink}/api/category/search`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
