import { useCallback, useState } from "react";
import { message } from "antd";
import { requestPayoutAPI } from "../../services/payoutService";

const useChangeStatusInstructor = (fetchData: () => void) => {
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  const handleRequestPayout = useCallback(
    async (payoutId: string) => {
      setStatusLoading(true);
      try {
        await requestPayoutAPI(payoutId, "request_payout", "");
        message.success("Payout request successfully");
        fetchData();
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setStatusLoading(false);
      }
    },
    [fetchData],
  );

  return {
    handleRequestPayout,
    statusLoading,
  };
};

export default useChangeStatusInstructor;
