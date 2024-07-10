import { useState, useEffect } from "react";
import StudentProfileBox from "./StudentProfileBox";
import StudentProfileSubTab from "./StudentSubTab";
import { getUserDetail } from "../../services/usersService"; // Import getUserDetail
import { UserData } from "../../models/Types"; // Import UserData type

const StudentProfileContent = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [userData, setUserData] = useState<UserData | null>(null);
  const userId = "someUserId"; // Replace with the actual user ID
  const token = "someUserId";
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserDetail(userId, token);
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>; // Render loading state if userData is not yet loaded
  }

  return (
    <div className="m-3 rounded-md bg-gray-300 p-3">
      <div className="rounded-md bg-gray-100 p-1">
        <StudentProfileBox userData={userData} />
        <StudentProfileSubTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default StudentProfileContent;
