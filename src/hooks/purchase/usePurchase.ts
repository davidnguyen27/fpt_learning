import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { DataTransfer, Purchase, PurchaseSearchResponse } from "../../models/Purchase";
import { getItemsByInstructor } from "../../services/purchaseService";

export const usePurchases = (dataTransfer: DataTransfer) => {
  const [data, setData] = useState<Purchase[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result: PurchaseSearchResponse = await getItemsByInstructor(dataTransfer);
      setData(result.data.pageData); // Set data from response
      setTotalItems(result.data.pageInfo.totalItems); // Set total items from response
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
