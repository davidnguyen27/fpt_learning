import { useEffect, useState, useCallback } from "react";
import { getSessionsAPI } from "../../services/sessionService";
import { Session, DataTransfer } from "../../models/Session";

const useSessionData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    try {
      const sessions = await getSessionsAPI(dataTransfer);
      setData(sessions);
      setError(null);
    } catch (err) {
      setError("Failed to fetch sessions.");
    } finally {
      setLoading(false);
    }
  }, [dataTransfer]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return { data, loading, error, refetchData: fetchSession };
};

export default useSessionData;
