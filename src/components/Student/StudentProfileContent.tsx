// import { useState, useEffect } from "react";
// import StudentProfileBox from "./StudentProfileBox";
// import StudentProfileSubTab from "./StudentSubTab";
// import { getUserDetail } from "../../services/usersService"; // Import getUserDetail
// import { UserData } from "../../models/Types"; // Import UserData type

// const StudentProfileContent = () => {
//   const [activeTab, setActiveTab] = useState("about");
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   const userId = sessionStorage.getItem("userId") || "defaultUserId"; // Retrieve userId from sessionStorage or use a default value
//   const token = sessionStorage.getItem("token") || ""; // Retrieve token from sessionStorage

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const data = await getUserDetail(userId, token);
//         setUserData(data);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch user data");
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId, token]);

//   if (loading) {
//     return <div>Loading...</div>; // Render loading state if userData is not yet loaded
//   }

//   if (error) {
//     return <div>{error}</div>; // Render error state if there's an error
//   }

//   return (
//     <div className="m-3 rounded-md bg-gray-300 p-3">
//       <div className="rounded-md bg-gray-100 p-1">
//         <StudentProfileBox userData={userData} />
//         <StudentProfileSubTab activeTab={activeTab} setActiveTab={setActiveTab} />
//       </div>
//     </div>
//   );
// };

// export default StudentProfileContent;
