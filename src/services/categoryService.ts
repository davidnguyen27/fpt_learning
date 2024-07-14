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

//-------------------------------- Update Category (Admin) ---------------------------------------
export const updateCategoryAPI = async (categoryId: string, updatedCategoryData: Partial<Category>) => {
  try {
    const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage

    const response = await axios.put(
      `${APILink}/api/category/${categoryId}`, // API endpoint for updating user
      updatedCategoryData, // Data to send in the request body
      {
        headers: {
          "Content-Type": "application/json", // Set content-type header to JSON
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      }
    );

    const updatedCategory: Category = response.data.data; // Assuming response structure matches Category
    console.log("Updated user:", updatedCategory);

    return updatedCategory; // Return updated user data if successful
  } catch (error: any) {
    if (error.response) {
      console.error("Update user failed", error.response.data); // Handle error if update fails
      console.error("Status", error.response.status);
      console.error("Headers", error.response.headers);
    } else if (error.request) {
      console.error("No response", error.request); // Handle error if no response
    } else {
      console.error("Fail", error.message); // Handle other errors
    }
    throw error; // Throw error for handling in the component
  }
};

//-----------------------------------------------------------------------------------------------