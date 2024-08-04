import { useState } from "react";
import { deleteReviewAPI } from "../../services/reviewService";
import { message } from "antd";

const useDeleteReview = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteReview = async (reviewId: string) => {
    try {
      setLoading(true);
      console.log("Deleting review with ID:", reviewId); // Debug line
      await deleteReviewAPI(reviewId);
      message.success("Review deleted successfully");
      onSuccess(); // Refresh the data after deletion
    } catch (error) {
      console.error("Failed to delete review:", error); // Debug line
      message.error("Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  return { deleteReview, loading };
};

export default useDeleteReview;
