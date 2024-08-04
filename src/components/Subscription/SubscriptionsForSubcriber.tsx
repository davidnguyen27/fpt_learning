import React from "react";
import { Card, Typography, Spin, Avatar, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import useFetchSubscriptionsForSubcriber from "../../hooks/supscription/useSubscriptionDataForSubcriber";
import useCreateUpdateSubscription from "../../hooks/supscription/useCreateUpdateSubscription";

const { Title, Text } = Typography;

const SubscriptionsForSubcriber: React.FC = () => {
  const userId = "YOUR_USER_ID_HERE";

  const { subscriptions, loading, setSubscriptions } =
    useFetchSubscriptionsForSubcriber(userId);
  const { handleUnsubscribe, unsubscribing } = useCreateUpdateSubscription(
    subscriptions,
    setSubscriptions,
  );
  if (loading)
    return (
      <div className="mt-24 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="">
      {subscriptions.length > 0 ? (
        <div className="flex">
          {subscriptions.map((subscription) => (
            <Card
              key={subscription.id}
              className="w-64 m-4"
            >
              <div className="flex flex-col items-center">
                <Avatar src={subscription.avatar_url} size={64} />
                <div className="mt-4 flex items-center">
                  <Title level={4} className="mb-0">
                    {subscription.instructor_name}
                  </Title>
                  <Text>{subscription.name}</Text>
                  <CheckCircleOutlined className="mb-2 ml-2 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  type="primary"
                  danger
                  loading={unsubscribing}
                  onClick={() => handleUnsubscribe(subscription.instructor_id)}
                >
                  Subscribed
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
