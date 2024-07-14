import axios from "axios";
import { Session, SessionData, SessionSearchRequest, SessionSearchResponse } from "../models/Session/Types";
import { APILink } from "../const/linkAPI";

//--------------------------------- Get Session (Admin/ Instructor) -------------------------------------------
export const getSession = async (
    requestData: SessionSearchRequest,
  ): Promise<SessionSearchResponse> => {
    try {
      console.log("Loading session with:", requestData);
  
      const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
  
      const response = await axios.post(
        // Send a POST request to fetch users from the API
        `${APILink}/api/session/search`, // API endpoint
        requestData, // Data to send
        {
          headers: {
            "Content-Type": "application/json", // Set content-type header to JSON
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        },
      );
  
      const data: SessionSearchResponse = response.data; // Get data from response
  
      console.log("Loading sessions successfully, sessions:", data);
  
      return data; // Return session data from the API
    } catch (error: any) {
      if (error.response) {
        console.error("Loading sessions fail.", error.response.data); // Handle error if response fails
        console.error("Status", error.response.status);
        console.error("Headers", error.response.headers);
      } else if (error.request) {
        console.error("Not response", error.request); // Handle error if no response
      } else {
        console.error("Fail", error.message); // Handle other errors
      }
      throw error; // Throw error for handling in the component
    }
  };
  //-----------------------------------------------------------------------------------------------

  //--------------------------------- Create Session (Instructor) -------------------------------------------
  export const createSessionAPI = async (sessionData: Partial<Session["data"]>) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Cannot get token!");
  
      console.log("Sending session data to create:", sessionData); // Log the user data
  
      const res = await axios.post(`${APILink}/api/session/create`, sessionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("session created successfully:", res.data.data); // Log the response data
      return res.data.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Create session failed:", error.response.data); // Log detailed error message
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response from server:", error.request); // Log request details if no response
      } else {
        console.error("Error creating session:", error.message); // Log any other errors
      }
      throw new Error("Failed to create user");
    }
  };
  
//-------------------------------- Update Session (Instructor) ---------------------------------------
export const updateSession = async (
    sessionId: string,
    updatedSessionData: Partial<SessionData>,
  ) => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
  
      const response = await axios.put(
        `${APILink}/api/session/${sessionId}`, // API endpoint for updating user
        updatedSessionData, // Data to send in the request body
        {
          headers: {
            "Content-Type": "application/json", // Set content-type header to JSON
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        },
      );
  
      const updatedSession: SessionData = response.data.data; // Assuming response structure matches UserData
      console.log("Updated session:", updatedSession);
  
      return updatedSession; // Return updated user data if successful
    } catch (error: any) {
      if (error.response) {
        console.error("Update session failed", error.response.data); // Handle error if update fails
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
  //--------------------------------- Delete User (Admin) -----------------------------------------
export const deleteSession = async (sessionId: string): Promise<void> => {
    try {
      console.log("Deleting session with id:", sessionId);
  
      const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
  
      await axios.delete(`${APILink}/api/session/${sessionId}`, {
        headers: {
          "Content-Type": "application/json", // Set content-type header to JSON
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      });
  
      console.log("Delete session successfully");
    } catch (error: any) {
      if (error.response) {
        console.error("Delete session failed", error.response.data); // Handle error if delete fails
        console.error("Status", error.response.status);
        console.error("Headers", error.response.headers);
      } else if (error.request) {
        console.error("Not response", error.request); // Handle error if no response
      } else {
        console.error("Fail", error.message); // Handle other errors
      }
      throw error; // Throw error for handling in the component
    }
  };
  //-----------------------------------------------------------------------------------------------