import { useEffect, useState, useCallback } from "react";
import { getReviewsAPI } from "../../services/reviewService";
import { Review, DataTransfer } from "../../models/Review";

const useReviewData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchreviews = useCallback(async () => {
    setLoading(true);
    try {
      const reviews = await getReviewsAPI(dataTransfer);
      setData(reviews);
      setError(null);
    } catch (err) {
      setError("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  }, [dataTransfer]);

  useEffect(() => {
    fetchreviews();
  }, [fetchreviews]);

  return { data, loading, error, refetchData: fetchreviews };
};

export default useReviewData;