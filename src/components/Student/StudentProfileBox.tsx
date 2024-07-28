import { useEffect, useState } from "react";
import { getUserDetail } from "../../services/usersService";
import { UserData } from "../../models/Types";

const StudentProfileBox = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.data?._id;

  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token && userId) {
        const fetchedUserData = await getUserDetail(userId, token);
        if (fetchedUserData) {
          setUserData(fetchedUserData);
        } else {
          setUserData(null);
        }
      }
    } catch (error: any) {
      console.error("Failed to fetch user data:", error);
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="text-black">
      <div className="flex flex-col rounded-lg bg-gray-800 p-6 md:flex-row md:items-center md:justify-start">
        <div className="mb-4 flex-shrink-0 md:mb-0 md:mr-6">
          <img
            className="h-24 w-24 cursor-pointer rounded-full border-4 border-gray-500 md:h-36 md:w-36 lg:h-48 lg:w-48"
            src={
              userData?.avatar ||
              "https://i.pinimg.com/736x/18/2f/fe/182ffe44b2e0782e34370f6e21045825.jpg"
            }
            alt="Student Avatar"
          />
        </div>
        <div className="flex-1 border-l-4 border-white pl-6">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="mb-2 text-4xl font-bold text-white">User Profile</h2>
            <p className="text-lg text-white md:text-xl lg:text-2xl">
              Hello {userData?.name || "Your Name"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileBox;
