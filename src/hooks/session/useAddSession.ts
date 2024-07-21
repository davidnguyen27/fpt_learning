import { message } from "antd";
import { useState } from "react";
import { createSessionAPI } from "../../services/sessionService";
import { Session } from "../../models/Session";

const useAddSession = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const createSession = async (sessionData: Session) => {
    try {
      setLoading(true);
      sessionData.position_order = Number(sessionData.position_order);
      await createSessionAPI(sessionData);
      message.success("Session added successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to add course!");
    } finally {
      setLoading(false);
    }
  };

  return { createSession, loading };
};

export default useAddSession;
