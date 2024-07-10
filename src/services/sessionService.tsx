// import axios from "axios";
// import { SessionSearchRequest, SessionSearchResponse } from "../models/Session/Types";
// import { APILink } from "../const/linkAPI";

// //--------------------------------- Get Users (Admin) -------------------------------------------
// export const getSession = async (
//     requestData: SessionSearchRequest,
//   ): Promise<SessionSearchResponse> => {
//     try {
//       console.log("Loading users with:", requestData);
  
//       const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
  
//       const response = await axios.post(
//         // Send a POST request to fetch users from the API
//         `${APILink}/api/session/search`, // API endpoint
//         requestData, // Data to send
//         {
//           headers: {
//             "Content-Type": "application/json", // Set content-type header to JSON
//             Authorization: `Bearer ${token}`, // Add token to Authorization header
//           },
//         },
//       );
  
//       const data: SessionSearchResponse = response.data; // Get data from response
  
//       console.log("Loading sessions successfully, sessions:", data);
  
//       return data; // Return user data from the API
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Loading users fail.", error.response.data); // Handle error if response fails
//         console.error("Status", error.response.status);
//         console.error("Headers", error.response.headers);
//       } else if (error.request) {
//         console.error("Not response", error.request); // Handle error if no response
//       } else {
//         console.error("Fail", error.message); // Handle other errors
//       }
//       throw error; // Throw error for handling in the component
//     }
//   };
//   //-----------------------------------------------------------------------------------------------