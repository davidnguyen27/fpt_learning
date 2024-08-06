import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { DataTransfer, Purchase } from "../../models/Purchase";
import { getItemsByInstructor } from "../../services/purchaseService";

export const usePurchases = (dataTransfer: DataTransfer) => {
  const [data, setData] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getItemsByInstructor(dataTransfer);
      setData(result);
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
