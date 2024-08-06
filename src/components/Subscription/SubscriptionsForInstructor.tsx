import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Avatar } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getUserDetail } from "../../services/usersService";
import "../../styles/studentProfileBox.css"; // Ensure this path is correct
import useFetchSubscriptionsForInstructer from "../../hooks/supscription/useSubscriptionDataForInstructor";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const SubscriptionsForInstructor: React.FC = () => {
  const instructorId = "YOUR_INSTRUCTOR_ID_HERE"; // Replace with actual instructor ID

  // Use the custom hook to fetch subscriptions
  const { subscriptions, loading } = useFetchSubscriptionsForInstructer(instructorId);

  // State for storing subscriber details
  const [subscriberDetails, setSubscriberDetails] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchSubscriberDetails = async () => {
      try {
        // Fetch details for each subscriber in subscriptions
        const details = await Promise.all(
          subscriptions.map((sub) => getUserDetail(sub.subscriber_id)) // Adjust this if subscriber_id is different
        );
        
        // Create a mapping of subscriber ID to details
        const detailsMap = details.reduce((acc: any, detail: any) => {
          acc[detail._id] = detail;
          return acc;
        }, {});
        
        setSubscriberDetails(detailsMap);
      } catch (error) {
        console.error("Failed to fetch subscriber details:", error);
      }
    };

    if (subscriptions.length) {
      fetchSubscriberDetails();
    }
  }, [subscriptions]);

  if (loading) {
    return (
      <div className="mt-24 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="">
      {subscriptions.length > 0 ? (
        <div className="flex flex-wrap">
          {subscriptions.map((subscription) => {
            const subscriberDetail = subscriberDetails[subscription.subscriber_id];
            return (
              <Link to={`/user-detail/${subscription.subscriber_id}`}>
              <Card key={subscription._id} className="w-64 m-4">
                <div className="flex flex-col items-center">
                  <Avatar
                    src={subscriberDetail?.avatar || "https://via.placeholder.com/64"} // Default avatar
                    size={64}
                  />
                  <div className="mt-4 flex items-center">
                    <Title level={4} className="mb-0">
                      {subscription.subscriber_name} {/* Display the subscriber's name */}
                    </Title>
                    <CheckCircleOutlined className="mb-2 ml-2 text-blue-500" />
                  </div>
                </div>
              </Card>
              </Link>
            );
          })}
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
