import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Avatar, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import useFetchSubscriptionsForSubcriber from "../../hooks/supscription/useSubscriptionDataForSubcriber";
import useCreateUpdateSubscription from "../../hooks/supscription/useCreateUpdateSubscription";
import { getUserDetail } from "../../services/usersService"; // Import the getUserDetail function
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const SubscriptionsForSubcriber: React.FC = () => {
  const userId = "YOUR_USER_ID_HERE"; // Replace with the actual user ID

  const { subscriptions, loading, setSubscriptions } =
    useFetchSubscriptionsForSubcriber(userId);
  const { handleUnsubscribe, unsubscribing } = useCreateUpdateSubscription(
    subscriptions,
    setSubscriptions,
  );

  // State for storing instructor details
  const [instructorDetails, setInstructorDetails] = useState<any>({});

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        // Fetch details for each instructor in subscriptions
        const details = await Promise.all(
          subscriptions.map((sub) => getUserDetail(sub.instructor_id)),
        );

        // Create a mapping of instructor ID to details
        const detailsMap = details.reduce((acc: any, detail: any) => {
          acc[detail._id] = detail;
          return acc;
        }, {});

        setInstructorDetails(detailsMap);
      } catch (error) {
        console.error("Failed to fetch instructor details:", error);
      }
    };

    if (subscriptions.length) {
      fetchInstructorDetails();
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
            const instructorDetail =
              instructorDetails[subscription.instructor_id];
            return (
              <Card key={subscription.id} className="m-4 w-64">
                <Link to={`/user-detail/${subscription.instructor_id}`}>
                  <div className="flex flex-col items-center">
                    <Avatar
                      src={
                        instructorDetail?.avatar ||
                        "https://via.placeholder.com/64"
                      } // Default avatar
                      size={64}
                    />
                    <div className="mt-4 flex items-center">
                      <Title level={4} className="mb-0">
                        {subscription.instructor_name}{" "}
                        {/* Display the instructor's name */}
                      </Title>
                      <Text>{subscription.name}</Text>
                      <CheckCircleOutlined className="mb-2 ml-2 text-blue-500" />
                    </div>
                  </div>
                </Link>
                <div className="mt-4 flex justify-center">
                  <Button
                    type="primary"
                    danger
                    loading={unsubscribing}
                    onClick={() =>
                      handleUnsubscribe(subscription.instructor_id)
                    }
                  >
                    Subscribed
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Text className="text-lg font-semibold text-gray-600">
            You are not following anyone yet.
          </Text>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsForSubcriber;
