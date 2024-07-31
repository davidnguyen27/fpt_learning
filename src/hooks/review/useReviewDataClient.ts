import { useEffect, useState, useCallback, useMemo } from "react";
import { getReviewsClientAPI } from "../../services/reviewService";
import { Review, DataTransfer } from "../../models/Review";

const useReviewDataClient = (courseId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dataTransfer: DataTransfer = useMemo(() => ({
    searchCondition: {
      course_id: courseId,
      rating: 0,
      is_instructor: false,
      is_rating_order: false,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  }), [courseId]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const reviews = await getReviewsClientAPI(dataTransfer);
      setData(reviews);
      setError(null);
    } catch (err) {
      setError("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  }, [dataTransfer]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { data, loading, error, refetchData: fetchReviews };
};

export default useReviewDataClient;
