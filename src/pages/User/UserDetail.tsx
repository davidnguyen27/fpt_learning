import React, { useEffect, useState } from "react";
import { UserData, UserDetailProp } from "../../models/Types";
import { getUserDetail } from "../../services/usersService";

interface UserDetailProps extends UserDetailProp {
  token: string;
}

const UserDetail: React.FC<UserDetailProps> = ({ _id, token }) => {
  const [userDetail, setUserDetail] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const userData = await getUserDetail(_id, token);
        if (userData) {
          setUserDetail(userData);
        } else {
          setUserDetail(null);
          setError("User not found");
        }
      } catch (error) {
        setError("Failed to fetch user detail");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [_id, token]);

  if (loading) {
    return <div>Loading user detail...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetail) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>User Detail</h2>
      <p>Name: {userDetail.name}</p>
      <p>Email: {userDetail.email}</p>
    </div>
  );
};

export default UserDetail;
