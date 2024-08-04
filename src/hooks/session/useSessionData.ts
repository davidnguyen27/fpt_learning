import { useEffect, useState, useCallback } from 'react';
import { getSessionsAPI } from '../../services/sessionService';
import { Session, DataTransfer, SessionSearchResponse } from '../../models/Session';

const useSessionData = (dataTransfer: DataTransfer) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState({
    pageNum: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const fetchSession = useCallback(async () => {
    setLoading(true);
    try {
      const response: SessionSearchResponse = await getSessionsAPI(dataTransfer);
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
    fetchSession();
  }, [fetchSession]);

  return { data, loading, error, pageInfo, refetchData: fetchSession };
};

export default useSessionData;
