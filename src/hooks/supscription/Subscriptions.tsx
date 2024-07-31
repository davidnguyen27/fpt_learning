import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, Avatar, Button, notification } from "antd";
import {
  getSubscriptionBySubscriberAPI,
  createUpdateSubscriptionAPI,
} from "../../services/subscriptionService";
import { BellOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Subscriptions: React.FC<{ onSubscriptionChange?: () => void }> = ({
  onSubscriptionChange,
}) => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = "YOUR_USER_ID_HERE"; // Thay thế bằng ID người dùng thực tế

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token || !userId) throw new Error("Token or User ID is missing");
        const dataTransfer = {
          searchCondition: { keyword: "", is_delete: false },
          pageInfo: { pageNum: 1, pageSize: 10 },
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

  const handleUnsubscribe = async (
    subscriptionId: string,
    instructorId: string,
  ) => {
    try {
      await createUpdateSubscriptionAPI(instructorId, { is_deleted: true });
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((sub) => sub._id !== subscriptionId),
      );
      notification.success({
        message: "Unsubscribed",
        description: "You have successfully unsubscribed.",
      });
      if (onSubscriptionChange) {
        onSubscriptionChange(); // Gọi hàm callback để cập nhật trạng thái bên ngoài
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to unsubscribe. Please try again.",
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Title level={2} className="mb-6 text-center">
        Subscriptions
      </Title>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <Spin size="large" />
          </div>
        ) : subscriptions.length > 0 ? (
          subscriptions.map((subscription) => (
            <Card key={subscription._id} className="shadow-lg">
              <div className="flex items-center">
                <Avatar src={subscription.avatar_url} size={64} />
                <div className="ml-4">
                  <Title level={4}>{subscription.instructor_name}</Title>
                  <Text>{subscription.name}</Text>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button
                  type="primary"
                  danger
                  onClick={() =>
                    handleUnsubscribe(
                      subscription._id,
                      subscription.instructor_id,
                    )
                  }
                >
                  Unsubscribe
                </Button>
                <Button icon={<BellOutlined />} />
              </div>
            </Card>
          ))
        ) : (
          <div className="w-full text-center">
            <Text>No subscriptions found.</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
