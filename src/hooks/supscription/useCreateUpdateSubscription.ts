import { useState } from "react";
import { createUpdateSubscriptionAPI } from "../../services/subscriptionService";
import { message } from "antd";

const useCreateUpdateSubscription = (
  subscriptions: any[],
  setSubscriptions: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const [unsubscribing, setUnsubscribing] = useState<boolean>(false);

  const handleUnsubscribe = async (instructorId: string) => {
    setUnsubscribing(true);
    try {
      const subscriptionData = {
        is_deleted: true,
      };
      await createUpdateSubscriptionAPI(instructorId, subscriptionData);
      setSubscriptions(
        subscriptions.filter((sub) => sub.instructor_id !== instructorId)
      );
      sessionStorage.removeItem(`subscribed_${instructorId}`);
      window.dispatchEvent(
        new CustomEvent("subscriptionChanged", { detail: { instructorId } })
      );

      message.success("Successfully unsubscribed.");
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
      message.error("Failed to unsubscribe. Please try again.");
    } finally {
      setUnsubscribing(false);
    }
  };

  return { handleUnsubscribe, unsubscribing };
};

export default useCreateUpdateSubscription;
