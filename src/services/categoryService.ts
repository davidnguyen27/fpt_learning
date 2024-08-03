import { axiosInstance } from './axiosInstance';
import { Category, DataTransfer } from "../models/Category";
import { APILink } from "../const/linkAPI";

export const getCategoriesAPI = async (
  dataTransfer: DataTransfer,
): Promise<Category[]> => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/category/search`, dataTransfer);
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getCategoryAPI = async (categoryId: string) => {
  try {
    const res = await axiosInstance.get(`${APILink}/api/category/${categoryId}`);

    const categoryData: Category = res.data.data;
    if (!categoryData) throw new Error("Not found category");

    return categoryData;
  } catch (error: any) {
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch category data");
  }
};

export const createCategoryAPI = async (categoryData: Partial<Category>) => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/category`, categoryData);
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
    const res = await axiosInstance.put(
      `${APILink}/api/category/${categoryId}`,
      categoryData,
    
    );
    return { ...res.data.data, _id: categoryId };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteCategoryAPI = async (categoryId: string) => {
  try {

    const res = await axiosInstance.delete(`${APILink}/api/category/${categoryId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCategoriesClientAPI = async (dataTransfer: DataTransfer) => {
  try {
    const res = await axiosInstance.post(`${APILink}/api/client/category/search`, dataTransfer);
    return res.data.data.pageData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
