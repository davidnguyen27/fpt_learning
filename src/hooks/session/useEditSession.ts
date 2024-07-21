import { useState } from "react";
import { editSessionAPI } from "../../services/sessionService";
import { message } from "antd";
import { Session } from "../../models/Session";

const useEditSession = (onSuccess: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const editSession = async (
    sessionId: string,
    sessionData: Session,
  ) => {
    try {
      setLoading(true);
      sessionData.position_order = Number(sessionData.position_order);
      await editSessionAPI(sessionId, sessionData);
      message.success("Session updated successfully");
      onSuccess();
    } catch (error) {
      message.error("Failed to update session");
    } finally {
      setLoading(false);
    }
  };

  return { editSession, loading };
};

export default useEditSession;
