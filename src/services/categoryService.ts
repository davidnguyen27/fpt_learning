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
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCategoriesAPI = async (
  searchKeyword: string,
): Promise<Category> => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(
      `${APILink}/api/category/search`,
      {
        searchCondition: {
          keyword: searchKeyword,
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCategoryAPI = async (id: string) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("Cannot get your token!");

    const res = await axios.get(`${APILink}/api/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const categoryData: Category["pageData"][number] = res.data.data;
    console.log(categoryData);
    if (categoryData) {
      return categoryData;
    } else {
      throw new Error("Not found!");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateCategoryAPI = async (
  categoryId: string,
  categoryData: Partial<Category["pageData"][number]>,
): Promise<Category["pageData"][number]> => {
  try {
    const token = sessionStorage.getItem("token");
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
    throw new Error(error.message);
  }
};

export const deleteCategoryAPI = async (categoryId: string): Promise<void> => {
  try {
    const token = sessionStorage.getItem("token");
    await axios.delete(`${APILink}/api/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API delete response: Category deleted successfully");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
