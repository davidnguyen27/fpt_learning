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
      <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 md:flex-row md:items-start">
        <img
          className="mr-4 h-32 w-32 cursor-pointer rounded-full border-4 border-gray-500 md:h-48 md:w-48 lg:h-64 lg:w-64"
          src={
            userData?.avatar ||
            "https://i.pinimg.com/736x/18/2f/fe/182ffe44b2e0782e34370f6e21045825.jpg"
          }
          alt="Student Avatar"
        />
        <div className="flex flex-col items-center text-center md:ml-4 md:items-start md:text-left">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Hello {userData?.name || "Your Name"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileBox;
