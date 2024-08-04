import { useEffect, useState, useCallback } from "react";
import { getReviewsAPI } from "../../services/reviewService";
import { Review, DataTransfer, ReviewSearchResponse } from "../../models/Review";

const useReviewData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState({
    pageNum: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const fetchreviews = useCallback(async () => {
    setLoading(true);
    try {
      const response: ReviewSearchResponse = await getReviewsAPI(dataTransfer);
      if (response.success) {
        setData(response.data.pageData);
        setPageInfo({
          pageNum: response.data.pageInfo.pageNum,
          pageSize: response.data.pageInfo.pageSize,
          totalItems: response.data.pageInfo.totalItems,
          totalPages: response.data.pageInfo.totalPages,
        });
        setError(null);
      } else {
        setError('Failed to fetch sessions.');
      }
    } catch (err) {
      setError('Failed to fetch sessions.');
    } finally {
      setLoading(false);
    }
  }, [dataTransfer]);

  useEffect(() => {
    fetchreviews();
  }, [fetchreviews]);

  return { data, loading, error, pageInfo, refetchData: fetchreviews };
};

export default useReviewData;