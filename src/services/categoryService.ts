import axios from "axios";
import { APILink } from "../const/linkAPI";
import { CategorySearchRequest, CategorySearchResponse } from "../models/Types";

export const getCategories = async (
    requestData: CategorySearchRequest,
  ): Promise<CategorySearchResponse> => {
    try {
      console.log("Loading categories with:", requestData);
  
      const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
  
      const response = await axios.post(
        `${APILink}/api/category/search`, // API endpoint for categories
        requestData, // Data to send
        {
          headers: {
            "Content-Type": "application/json", // Set content-type header to JSON
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        },
      );
  
      const data: CategorySearchResponse = response.data; // Get data from response
  
      console.log("Loading categories successfully, categories:", data);
  
      return data; // Return category data from the API
    } catch (error: any) {
      if (error.response) {
        console.error("Loading categories fail.", error.response.data); // Handle error if response fails
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