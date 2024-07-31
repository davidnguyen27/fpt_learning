import { useEffect, useState } from "react";
import { getUserDetail } from "../../services/usersService";
import { getSubscriptionBySubscriberAPI } from "../../services/subscriptionService";
import { UserData } from "../../models/Types";
import "../../styles/studentProfileBox.css";
import { Subscription } from "../../models/Subscription"; // Ensure this import is correct

const StudentProfileBox = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [following, setFollowing] = useState<Subscription[]>([]);
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.data?._id;

  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token && userId) {
        const fetchedUserData = await getUserDetail(userId);
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

  const fetchFollowing = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token && userId) {
        const dataTransfer = {
          searchCondition: {
            keyword: "",
            is_delete: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        };
        const fetchedFollowing: Subscription[] = await getSubscriptionBySubscriberAPI(userId, dataTransfer);
        setFollowing(fetchedFollowing);
      }
    } catch (error: any) {
      console.error("Failed to fetch following data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchFollowing(); // Fetch following data when the component mounts
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-cover"/>
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={
            userData?.avatar ||
            "https://scontent.fsgn2-11.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeFmkgKEy1Ar9JJGsimvdU8Pso2H55p0AlGyjYfnmnQCUe8hu2v__FYxhNmGgs0sudO-P8gX7RILwPRya2V91U_C&_nc_ohc=qj3fwGIe_3cQ7kNvgEqEV_R&_nc_ht=scontent.fsgn2-11.fna&oh=00_AYAs1Q-eCqPQb9ugh2R4iFKCJdyVcC-8pAHmy9eYIaY5qA&oe=66BBE478"
          }
          alt="Student Avatar"
        />
        <div className="profile-details">
          <h2 className="profile-name">{userData?.name || "Your Name"}</h2>
          {/* <p className="profile-tagline" dangerouslySetInnerHTML={{ __html: userData?.description || "" }} /> */}
          <div className="profile-stats">
            <div>
              <button className="profile-stat-button" onClick={fetchFollowing}>
                Following:
              </button>
              <span className="profile-stat-number ml-1">{following.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileBox;
