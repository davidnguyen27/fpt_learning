import axios from "axios";
import { Category, DataTransfer } from "../models/Category";
import { APILink } from "../const/linkAPI";

export const getCategoriesAPI = async (
  dataTransfer: DataTransfer,
): Promise<Category[]> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/category/search`, dataTransfer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCategoryAPI = async (categoryId: string) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.get(`${APILink}/api/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const categoryData: Category = res.data.data;
    if (!categoryData) throw new Error("Not found category");

    return categoryData;
  } catch (error: any) {
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch category data");
  }
};

export const createCategoryAPI = async (
  categoryData: Partial<Category>,
) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.post(`${APILink}/api/category`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const editCategoryAPI = async (
  categoryId: string,
  categoryData: Partial<Category>,
): Promise<Category> => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.put(
      `${APILink}/api/category/${categoryId}`,
      categoryData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { ...res.data.data, _id: categoryId };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteCategoryAPI = async (categoryId: string) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get token!");

    const res = await axios.delete(`${APILink}/api/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
