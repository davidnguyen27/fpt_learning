import { useCallback, useEffect, useState } from "react";
import { DataTransfer, Payout } from "../../models/Payout";
import { getPayoutsAPI } from "../../services/payoutService";
import { message } from "antd";

const usePayoutsData = (dataTransfer: DataTransfer) => {
  const [data, setData] = useState<Payout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPayoutsAPI(dataTransfer);
      if (result && result.data && Array.isArray(result.data.pageData)) {
        setData(result.data.pageData);
      }
      setLoading(false);
    } catch (error: any) {
      message.error(error.message);
      setLoading(false);
    }
  }, [dataTransfer]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, fetchData };
};

export default usePayoutsData;
