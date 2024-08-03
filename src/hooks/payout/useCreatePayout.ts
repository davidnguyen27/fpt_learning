import { useState } from "react";
import { createPayoutAPI } from "../../services/payoutService";
import { message } from "antd";

export const useCreatePayout = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const createPayout = async (
    instructor_id: string,
    transactions: { purchase_id: string }[],
  ) => {
    setLoading(true);
    try {
      const response = await createPayoutAPI(instructor_id, transactions);
      message.success("Payout created successfully");
      return response;
    } catch (error: any) {
      message.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createPayout, loading };
};
