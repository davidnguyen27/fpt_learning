import { useEffect, useState } from "react";
import { DataTransfer } from "../../models/Session";
import { getSessionsAPI } from "../../services/sessionService";

interface DataType {
  key: string;
  name: string;
  course_id: string;
  created_at: Date;
  updated_at: Date;
  position_order: number;
}

const useSessionData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSession();
  }, [dataTransfer]);

  const fetchSession = async () => {
    setLoading(true);
    try {
      const session = await getSessionsAPI(dataTransfer);
      const groupedData: DataType[] = session.map((session) => ({
        key: session._id,
        position_order: session.position_order,
        name: session.name,
        course_id: session.course_id,
        created_at: session.created_at,
        updated_at: session.updated_at,
      }));
      setData(groupedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch session.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetchData: fetchSession };
};

export default useSessionData;
