import { useState } from "react";
import { deleteReviewAPI } from "../../services/reviewService";
import { message } from "antd";

const useDeleteReview = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteReview = async (reviewId: string) => {
    try {
      setLoading(true);
      await deleteReviewAPI(reviewId);
      message.success("Session deleted successfully");
      onSuccess(); // Call onSuccess to refresh the lessons list
    } catch (error) {
      message.error("Failed to delete Session");
    } finally {
      setLoading(false);
    }
  };

  return { deleteReview, loading };
};

export default useDeleteReview;
