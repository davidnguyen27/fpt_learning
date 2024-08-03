import { useCallback, useState } from "react";
import { message } from "antd";
import { requestPayoutAPI } from "../../services/payoutService";

const useChangeStatusAdmin = (fetchData: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentPayoutId, setCurrentPayoutId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");

  const handleRequestPayout = useCallback(
    async (payoutId: string, status: string, comment: string = "") => {
      setLoading(true);
      try {
        await requestPayoutAPI(payoutId, status, comment);
        message.success("Request Payout successfully");
        fetchData();
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [fetchData],
  );

  const handleApprove = (payoutId: string) => {
    handleRequestPayout(payoutId, "completed");
  };

  const handleReject = (payoutId: string) => {
    setCurrentPayoutId(payoutId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (currentPayoutId) {
      handleRequestPayout(currentPayoutId, "rejected", comment);
    }
    setIsModalVisible(false);
    setComment("");
    setCurrentPayoutId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setComment("");
    setCurrentPayoutId(null);
  };

  return {
    loading,
    isModalVisible,
    comment,
    setComment,
    handleApprove,
    handleReject,
    handleOk,
    handleCancel,
  };
};

export default useChangeStatusAdmin;
