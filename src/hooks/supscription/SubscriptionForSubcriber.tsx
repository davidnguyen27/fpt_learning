import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, Avatar, Button, message } from "antd";
import {
  getSubscriptionBySubscriberAPI,
  createUpdateSubscriptionAPI,
} from "../../services/subscriptionService";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const SubscriptionsForSubcriber: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = "YOUR_USER_ID_HERE";

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token || !userId) {
          throw new Error("Token or User ID is missing");
        }
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
        const fetchedSubscriptions = await getSubscriptionBySubscriberAPI(
          userId,
          dataTransfer,
        );
        setSubscriptions(fetchedSubscriptions);
      } catch (error) {
        console.error("Failed to fetch subscriptions data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  const handleUnsubscribe = async (instructorId: string) => {
    try {
      const subscriptionData = {
        is_deleted: true,
      };
      await createUpdateSubscriptionAPI(instructorId, subscriptionData);
      setSubscriptions(
        subscriptions.filter((sub) => sub.instructor_id !== instructorId),
      );
      localStorage.removeItem(`subscribed_${instructorId}`);
      window.dispatchEvent(
        new CustomEvent("subscriptionChanged", { detail: { instructorId } }),
      );

      // Show success message
      message.success("Successfully unsubscribed.");
    } catch (error) {
      console.error("Failed to unsubscribe:", error);

      // Show error message
      message.error("Failed to unsubscribe. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center p-6">
      <Title level={2} className="text-center">
        Followers
      </Title>
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <Spin size="large" />
        </div>
      ) : subscriptions.length > 0 ? (
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((subscription) => (
            <Card
              key={subscription.id}
              className="flex flex-col items-center shadow-lg"
            >
              <div className="flex flex-col items-center">
                <Avatar src={subscription.avatar_url} size={64} />
                <div className="mt-4 flex items-center">
                  <Title level={4} className="mb-0">
                    {subscription.instructor_name}
                  </Title>
                  <Text>{subscription.name}</Text>
                  <CheckCircleOutlined className="ml-2 mb-2 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  type="primary"
                  danger
                  onClick={() => handleUnsubscribe(subscription.instructor_id)}
                >
                  Subcribed
                </Button>
              </div>
            </Card>
          ))}
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
