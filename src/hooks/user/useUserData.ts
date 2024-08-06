import { useState, useEffect } from 'react';
import { UserSearchRequest, UserSearchResponse } from '../../models/Types';
import { getUsers } from '../../services/usersService';

const useUserData = (requestData: UserSearchRequest) => {
  const [data, setData] = useState<UserSearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getUsers(requestData);
        setData(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestData]);

  return { data, loading, error };
};

export default useUserData;
