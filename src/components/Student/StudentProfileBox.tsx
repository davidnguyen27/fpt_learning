import { useEffect, useState } from "react";
import { getUserDetail } from "../../services/usersService";
import { UserData } from "../../models/Types";
import "../../styles/studentProfileBox.css"

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
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={
            userData?.avatar ||
            "https://i.pinimg.com/736x/18/2f/fe/182ffe44b2e0782e34370f6e21045825.jpg"
          }
          alt="Student Avatar"
        />
        <div className="profile-details">
          <h2 className="profile-name">{userData?.name || "Your Name"}</h2>
          <p className="profile-tagline">Description</p>
          <div className="profile-stats">
            <div>
              <span className="profile-stat-number">3</span> Following
            </div> 
            <div>
              <span className="profile-stat-number">3</span> Followers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileBox;
