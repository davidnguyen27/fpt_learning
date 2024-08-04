import React, { useEffect, useState } from "react";
import { UserData } from "../../models/Types";
import { getUserDetail } from "../../services/usersService";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/loading";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userDetail, setUserDetail] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        if (id) {
          const userData = await getUserDetail(id);
          setUserDetail(userData);
        } else {
          setError("Invalid user ID");
        }
      } catch (error) {
        setError("Failed to fetch user detail");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (loading) {
    return <div><Loading/></div>;
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
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserDetail;
