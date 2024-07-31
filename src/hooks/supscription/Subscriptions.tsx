import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Avatar, Button } from 'antd';
import { getSubscriptionBySubscriberAPI } from '../../services/subscriptionService';
import { BellOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = 'YOUR_USER_ID_HERE'; 

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token || !userId) {
          throw new Error('Token or User ID is missing');
        }
        const dataTransfer = {
          searchCondition: {
            keyword: '',
            is_delete: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        };
        const fetchedSubscriptions = await getSubscriptionBySubscriberAPI(userId, dataTransfer);
        setSubscriptions(fetchedSubscriptions);
      } catch (error) {
        console.error('Failed to fetch subscriptions data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Title level={2} className="text-center mb-6">Subscriptions</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <Spin size="large" />
          </div>
        ) : subscriptions.length > 0 ? (
          subscriptions.map((subscription) => (
            <Card key={subscription.id} className="shadow-lg">
              <div className="flex items-center">
                <Avatar src={subscription.set} size={64} />
                <div className="ml-4">
                  <Title level={4}>{subscription.instructor_name}</Title>
                  <Text>{subscription.name}</Text>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Button type="primary">Subscribed</Button>
                <Button icon={<BellOutlined />} />
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center w-full">
            <Text>No subscriptions found.</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
