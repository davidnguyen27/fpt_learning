import React, { useEffect, useState } from "react";
import { UserData } from "../../models/Types";
import { getUserDetail } from "../../services/usersService";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/loading";
import { Tag } from "antd"; // Import Ant Design components
import StudentLayout from "../../components/Layout/StudentLayout";

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
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetail) {
    return <div>User not found</div>;
  }

  return (
    <StudentLayout>
      <div className="mx-auto max-w-4xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-start">
          <div className="lg:w-1/2 lg:pr-8">
            <h2 className="text-xl mb-2">{userDetail.role.toLocaleUpperCase()}</h2>
            <h1 className="text-3xl font-bold mb-2">{userDetail.name}</h1>
            <Tag color="geekblue" className="mt-2">
              Instructor Partner with FSA Education
            </Tag>
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold">About me</h3>
              <div
                dangerouslySetInnerHTML={{ __html: userDetail.description }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:w-1/2 lg:items-center lg:pl-8">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
              <img
                src={userDetail.avatar}
                alt={`${userDetail.name}'s avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="mb-2 mt-2 text-xl font-semibold">Contact me</h3>
              <Tag color="geekblue" className="mb-2">Email: {userDetail.email}</Tag><br />
              <Tag color="geekblue">Phone: {userDetail.phone_number}</Tag>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default UserDetail;
