import { axiosInstance } from './axiosInstance';
import { Category, DataTransfer } from "../models/Category";

export const getCategoriesAPI = async (
  dataTransfer: DataTransfer,
): Promise<Category[]> => {
  try {
    const res = await axiosInstance.post('/api/category/search', dataTransfer);
    return res.data.data.pageData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getCategoryAPI = async (categoryId: string) => {
  try {
    const res = await axiosInstance.get(`/api/category/${categoryId}`);

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
    const res = await axiosInstance.post('/api/category', categoryData);
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
    const res = await axiosInstance.put(`/api/category/${categoryId}`, categoryData);
    return { ...res.data.data, _id: categoryId };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteCategoryAPI = async (categoryId: string) => {
  try {
    await axiosInstance.delete(`/api/category/${categoryId}`);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCategoriesClientAPI = async (dataTransfer: DataTransfer) => {
  try {
    const res = await axiosInstance.post('/api/client/category/search', dataTransfer);
    return res.data.data.pageData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
