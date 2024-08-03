import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Avatar } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getSubscriptionByInstructorAPI } from "../../services/subscriptionService";
import { Subscription } from "../../models/Subscription";
import "../../styles/studentProfileBox.css"; // Ensure this path is correct

const { Title, Text } = Typography;

const SubscriptionsForInstructor: React.FC = () => {
  const instructorId = "YOUR_INSTRUCTOR_ID_HERE"; // Replace with actual instructor ID
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
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
        const fetchedSubscriptions = await getSubscriptionByInstructorAPI(
          instructorId,
          dataTransfer
        );
        setSubscriptions(fetchedSubscriptions);
      } catch (error) {
        console.error("Failed to fetch subscriptions data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [instructorId]);

  if (loading)
    return (
      <div className="mt-24 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex max-w-4xl flex-col items-center justify-center p-6">
      {subscriptions.length > 0 ? (
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((subscription) => (
            <Card
              key={subscription._id}
               className="flex flex-col items-center shadow-lg"
            >
              <div className="flex flex-col items-center">
              {/* <Avatar src={subscription.avatar_url} size={64} /> */}
              <Avatar 
                  src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeFmkgKEy1Ar9JJGsimvdU8Pso2H55p0AlGyjYfnmnQCUe8hu2v__FYxhNmGgs0sudO-P8gX7RILwPRya2V91U_C&_nc_ohc=qj3fwGIe_3cQ7kNvgEqEV_R&_nc_ht=scontent.fsgn2-11.fna&oh=00_AYAs1Q-eCqPQb9ugh2R4iFKCJdyVcC-8pAHmy9eYIaY5qA&oe=66BBE478" 
                  size={64} 
                />
                <div className="mt-4 flex items-center">
                  <Title level={4} className="mb-0">
                    {subscription.subscriber_name}
                  </Title>
                  <CheckCircleOutlined className="mb-2 ml-2 text-blue-500" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Text className="text-lg font-semibold text-gray-600">
            No followers yet.
          </Text>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsForInstructor;
