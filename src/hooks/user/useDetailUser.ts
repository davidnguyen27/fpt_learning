import { useEffect, useState } from "react";
import { getUserDetail } from "../../services/usersService";
import { UserData } from "../../models/Types";

const useDetailUser = (userId: string) => {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      setLoading(true);
      try {
        const userData = await getUserDetail(userId);
        setUser(userData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  return { user, loading, error };
};

export default useDetailUser;
