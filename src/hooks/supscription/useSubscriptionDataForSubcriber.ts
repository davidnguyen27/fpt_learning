import { useState, useEffect } from "react";
import { getSubscriptionBySubscriberAPI } from "../../services/subscriptionService";

const useFetchSubscriptionsForSubcriber = (userId: string) => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
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
        const fetchedSubscriptions = await getSubscriptionBySubscriberAPI(
          userId,
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
  }, [userId]);

  return { subscriptions, loading, setSubscriptions };
};

export default useFetchSubscriptionsForSubcriber;
