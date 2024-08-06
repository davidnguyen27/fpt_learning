import { useCallback, useEffect, useState } from "react";
import { DataTransfer, Payout, PayoutSearchResponse } from "../../models/Payout";
import { getPayoutsAPI } from "../../services/payoutService";
import { message } from "antd";

const usePayoutsData = (dataTransfer: DataTransfer) => {
  const [data, setData] = useState<Payout[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result: PayoutSearchResponse = await getPayoutsAPI(dataTransfer);
      if (result && result.data && Array.isArray(result.data.pageData)) {
        setData(result.data.pageData);
        setTotalItems(result.data.pageInfo.totalItems);
      }
      setError(null);
    } catch (error: any) {
      setError(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [dataTransfer]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, totalItems, loading, error, fetchData };
};

export default usePayoutsData;
