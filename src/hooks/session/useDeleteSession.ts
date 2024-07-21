import { useState } from "react";
import { deleteSessionAPI } from "../../services/sessionService";
import { message } from "antd";

const useDeleteSession = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteSession = async (sessionId: string) => {
    try {
      setLoading(true);
      await deleteSessionAPI(sessionId);
      message.success("Session deleted successfully");
      onSuccess(); // Call onSuccess to refresh the lessons list
    } catch (error) {
      message.error("Failed to delete Session");
    } finally {
      setLoading(false);
    }
  };

  return { deleteSession, loading };
};

export default useDeleteSession;
