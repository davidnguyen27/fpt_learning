import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Review } from '../../models/Review';
import { createReviewAPI } from '../../services/reviewService';
import { message } from 'antd';

const useAddReview = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const createReview = async (reviewData: Review) => {
    try {
      setLoading(true);
      reviewData.rating = Number(reviewData.rating);

      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate('/login'); // Redirect to login page if no token
        return;
      }

      await createReviewAPI(reviewData);
      message.success("Review added successfully");
      onSuccess();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createReview, loading };
};

export default useAddReview;
