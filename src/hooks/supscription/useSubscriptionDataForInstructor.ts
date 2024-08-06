import { useState, useEffect } from "react";
import { getSubscriptionByInstructorAPI } from "../../services/subscriptionService";
import { Subscription } from "../../models/Subscription"; // Update import path as needed

const useFetchSubscriptionsForInstructer = (userId: string) => {
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
        const fetchedSubscriptions = await getSubscriptionByInstructorAPI(userId, dataTransfer);
        setSubscriptions(fetchedSubscriptions);
      } catch (error) {
        console.error("Failed to fetch subscriptions data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  return { subscriptions, loading, setSubscriptions };
};

export default useFetchSubscriptionsForInstructer;
